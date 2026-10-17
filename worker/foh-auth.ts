/** Server-only investor access. Password verifiers and signing keys live in secrets. */
export const FOH_USERNAME = "Investor";
export const FOH_COOKIE = "__Host-nasaq_foh";
const AUTH_ORIGIN = "https://nasaq-coming-soon.abdullah-zu.chatgpt.site";
const SESSION_SECONDS = 8 * 60 * 60;
export interface FohAuthEnv {
  FOH_PASSWORD_SALT?: string;
  FOH_PASSWORD_HASH?: string;
  FOH_SESSION_SECRET?: string;
}
const encoder = new TextEncoder();
const hex = (bytes: ArrayBuffer) => Array.from(new Uint8Array(bytes), n => n.toString(16).padStart(2,"0")).join("");
const unhex = (value:string) => new Uint8Array(value.match(/.{2}/g)!.map(n=>parseInt(n,16)));

async function checkPassword(username:string,password:string,env:FohAuthEnv):Promise<boolean> {
  if(username!==FOH_USERNAME || !password || password.length>256 || !env.FOH_PASSWORD_SALT || !env.FOH_PASSWORD_HASH) return false;
  const key=await crypto.subtle.importKey("raw",encoder.encode(password),"PBKDF2",false,["deriveBits"]);
  const result=hex(await crypto.subtle.deriveBits({name:"PBKDF2",salt:encoder.encode(env.FOH_PASSWORD_SALT),iterations:100000,hash:"SHA-256"},key,256));
  let different=result.length^env.FOH_PASSWORD_HASH.length;
  for(let i=0;i<result.length;i++)different|=result.charCodeAt(i)^(env.FOH_PASSWORD_HASH.charCodeAt(i)||0);
  return different===0;
}

export function fohCookieValue(request:Request):string {
  const token=(request.headers.get("Cookie")||"").split(";").map(s=>s.trim()).find(s=>s.startsWith(FOH_COOKIE+"="))?.slice(FOH_COOKIE.length+1)||"";
  return /^\d{13}\.[a-f0-9]{32}\.[a-f0-9]{64}$/.test(token)?token:"";
}

async function signingKey(env:FohAuthEnv) {
  return crypto.subtle.importKey("raw",encoder.encode(env.FOH_SESSION_SECRET!),{name:"HMAC",hash:"SHA-256"},false,["sign","verify"]);
}
async function validSession(request:Request,env:FohAuthEnv):Promise<boolean> {
  const token=fohCookieValue(request);
  if(!token || !env.FOH_SESSION_SECRET || !env.FOH_PASSWORD_HASH)return false;
  const [expires,nonce,signature]=token.split("."),now=Date.now();
  if(Number(expires)<=now || Number(expires)>now+SESSION_SECONDS*1000+5000)return false;
  return crypto.subtle.verify("HMAC",await signingKey(env),unhex(signature),encoder.encode(`${FOH_USERNAME}\n${env.FOH_PASSWORD_HASH}\n${expires}.${nonce}`));
}

export async function authenticatedFoh(request:Request,env:FohAuthEnv):Promise<boolean> {
  if(await validSession(request,env))return true;
  const header=request.headers.get("Authorization")||"";
  if(header.length>512 || !/^Basic [A-Za-z0-9+/]+=*$/i.test(header))return false;
  try { const value=atob(header.slice(6)),colon=value.indexOf(":"); return colon>=0 && await checkPassword(value.slice(0,colon),value.slice(colon+1),env); }
  catch {return false;}
}

export function fohForwardHeaders(request:Request):Headers {
  const headers=new Headers(),cookie=fohCookieValue(request),basic=request.headers.get("Authorization")||"";
  if(cookie)headers.set("Cookie",FOH_COOKIE+"="+cookie);
  if(basic.length<=512 && /^Basic [A-Za-z0-9+/]+=*$/i.test(basic))headers.set("Authorization",basic);
  return headers;
}

export async function authenticatedRemoteFoh(request:Request):Promise<boolean> {
  const headers=fohForwardHeaders(request);
  if(!headers.has("Cookie")&&!headers.has("Authorization"))return false;
  try {const r=await fetch(AUTH_ORIGIN+"/_foh-session",{headers,redirect:"manual",signal:AbortSignal.timeout(15000)});await r.body?.cancel();return r.status===204;}
  catch{return false;}
}

function trustedLoginOrigin(request:Request):string|null {
  const allowed=["https://nasaqfb.com",AUTH_ORIGIN];
  const origin=request.headers.get("Origin");
  if(origin && origin!=="null")return allowed.includes(origin)?origin:null;
  // Privacy policies can hide Origin on normal browser form submissions.
  // Only browser-confirmed same-origin requests may use this fallback.
  const targetOrigin=new URL(request.url).origin;
  return request.headers.get("Sec-Fetch-Site")==="same-origin" && allowed.includes(targetOrigin)?targetOrigin:null;
}

async function readLoginBody(request:Request):Promise<string|null> {
  if(request.method!=="POST" || !(request.headers.get("Content-Type")||"").startsWith("application/x-www-form-urlencoded"))return null;
  if(!trustedLoginOrigin(request))return null;
  const reader=request.body?.getReader();if(!reader)return null;
  const chunks:Uint8Array[]=[];let size=0;
  while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>2048){await reader.cancel();return null;}chunks.push(value);}
  const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength;}
  return new TextDecoder().decode(bytes);
}
const cookieHeader=(token:string)=>`${FOH_COOKIE}=${token}; Path=/; Max-Age=${SESSION_SECONDS}; HttpOnly; Secure; SameSite=Lax`;

export async function handleFohLogin(request:Request,env:FohAuthEnv):Promise<Response> {
  const body=await readLoginBody(request);
  if(body===null)return privateFohResponse(new Response("Invalid sign-in request",{status:400}));
  if(!env.FOH_SESSION_SECRET || !env.FOH_PASSWORD_HASH || !env.FOH_PASSWORD_SALT)return privateFohResponse(new Response("Sign-in temporarily unavailable",{status:503}));
  const form=new URLSearchParams(body);
  if(!await checkPassword(form.get("username")||"",form.get("password")||"",env))return requireFohLogin(request,true);
  const nonce=hex(crypto.getRandomValues(new Uint8Array(16)).buffer),payload=`${Date.now()+SESSION_SECONDS*1000}.${nonce}`;
  const signature=hex(await crypto.subtle.sign("HMAC",await signingKey(env),encoder.encode(`${FOH_USERNAME}\n${env.FOH_PASSWORD_HASH}\n${payload}`)));
  return privateFohResponse(new Response(null,{status:303,headers:{Location:"/FOH","Set-Cookie":cookieHeader(payload+"."+signature)}}));
}

export async function relayFohLogin(request:Request):Promise<Response> {
  const body=await readLoginBody(request);
  if(body===null)return privateFohResponse(new Response("Invalid sign-in request",{status:400}));
  try {
    const r=await fetch(AUTH_ORIGIN+"/FOH/access",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded","Origin":trustedLoginOrigin(request)!},body,redirect:"manual",signal:AbortSignal.timeout(15000)});
    if(r.status===401){await r.body?.cancel();return requireFohLogin(request,true);}
    if(r.status!==303){await r.body?.cancel();return privateFohResponse(new Response("Sign-in temporarily unavailable. Please retry.",{status:503}));}
    const token=(r.headers.get("Set-Cookie")||"").match(/__Host-nasaq_foh=(\d{13}\.[a-f0-9]{32}\.[a-f0-9]{64})/)?.[1];
    await r.body?.cancel();
    if(!token)return privateFohResponse(new Response("Sign-in temporarily unavailable",{status:503}));
    return privateFohResponse(new Response(null,{status:303,headers:{Location:"/FOH","Set-Cookie":cookieHeader(token)}}));
  }catch{return privateFohResponse(new Response("Sign-in temporarily unavailable. Please retry.",{status:503}));}
}

export function requireFohLogin(request:Request,incorrect=false):Response {
  const body=request.method==="HEAD"?null:`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Investor access | NASAQ</title><style>*{box-sizing:border-box}body{margin:0;background:#132923;color:#f3eee4;font:17px/1.6 system-ui,sans-serif;display:grid;place-items:center;min-height:100svh}main{padding:40px 28px;max-width:510px;width:100%}small{letter-spacing:.18em;color:#c5a879}h1{font-size:38px;line-height:1.2;margin:20px 0}label{display:block;margin-top:18px;font-size:14px}input,button{width:100%;padding:14px;border-radius:6px;font:inherit}input{margin-top:6px;border:1px solid #71857a;background:#fff;color:#172e26}input[readonly]{background:#243d33;color:#e5e8df;border-color:#52695c}button{margin:24px 0 18px;border:0;background:#c5a879;color:#132923;font-weight:650;cursor:pointer}input:focus-visible,button:focus-visible,a:focus-visible{outline:3px solid #e9d5ac;outline-offset:3px}a{color:#c5a879}p{color:#d2dcd5}.error{color:#ffd1c5;margin-bottom:0}.note{font-size:13px}</style></head><body><main><small>NASAQ · INVESTOR ACCESS</small><h1>A private partnership conversation.</h1><p>Your username is already filled in. Enter your password to view the proposal.</p><form method="post" action="/FOH/access"><label for="username">Username<input id="username" name="username" value="Investor" readonly autocomplete="username"></label><label for="password">Password<input id="password" name="password" type="password" required maxlength="256" autocomplete="current-password" autofocus ${incorrect?'aria-invalid="true" aria-describedby="login-error"':''}></label>${incorrect?'<p class="error" id="login-error" role="alert">Incorrect password. Please try again.</p>':''}<button type="submit">View the proposal</button></form><p class="note" dir="rtl">اسم المستخدم محفوظ. أدخل كلمة المرور لعرض مقترح الشراكة.</p><a href="/en">Return to NASAQ</a></main></body></html>`;
  return privateFohResponse(new Response(body,{status:401,headers:{"Content-Type":"text/html; charset=utf-8","Referrer-Policy":"same-origin","Content-Security-Policy":"default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'"}}));
}

export function protectedFohPath(path: string): boolean {
  // Match the same route through encoded characters, case variants and RSC URLs.
  for (let i = 0; i < 4; i++) {
    try { const decoded = decodeURIComponent(path); if (decoded === path) break; path = decoded; }
    catch { break; }
  }
  path = path.replace(/\\/g, "/").replace(/\/+/g, "/").toLowerCase();
  return path === "/foh" || path.startsWith("/foh/") ||
    /^\/assets\/(?:foh[-.]|foh-financials[-.])/.test(path);
}

export function isFohRequest(request: Request): boolean {
  const url = new URL(request.url);
  if (protectedFohPath(url.pathname)) return true;
  if (url.pathname === "/_vinext/image" || url.pathname === "/_next/image") {
    try { return protectedFohPath(new URL(url.searchParams.get("url") || "", url).pathname); }
    catch { return false; }
  }
  return false;
}


export function privateFohResponse(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set("Cache-Control", "private, no-store, max-age=0");
  headers.set("Pragma", "no-cache");
  headers.set("Expires", "0");
  headers.set("Vary", [...new Set((headers.get("Vary") || "").split(",").map(s => s.trim()).filter(Boolean).concat("Authorization", "Cookie"))].join(", "));
  headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  if(!headers.has("Referrer-Policy"))headers.set("Referrer-Policy", "no-referrer");
  headers.set("X-Content-Type-Options", "nosniff");
  return new Response(response.body, {status: response.status, statusText: response.statusText, headers});
}

