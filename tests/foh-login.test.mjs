import assert from 'node:assert/strict'
import test from 'node:test'
import {createHmac} from 'node:crypto'
import {auth,bindings,password} from './foh-auth-fixture.mjs'
const post=(data,origin='https://nasaqfb.com')=>new Request('https://nasaqfb.com/FOH/access',{method:'POST',headers:{Origin:origin,'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(data)})
const cookieRequest=cookie=>new Request('https://nasaqfb.com/FOH',{headers:{Cookie:cookie}})
test('sign-in prefills Investor and shows no native browser popup or saved password',async()=>{
 const r=auth.requireFohLogin(new Request('https://nasaqfb.com/FOH')),html=await r.text()
 assert.equal(r.status,401);assert.equal(r.headers.get('www-authenticate'),null)
 assert.equal(r.headers.get('referrer-policy'),'same-origin','Browser form posts must retain their Origin')
 assert.match(html,/name="username" value="Investor" readonly autocomplete="username"/)
 assert.match(html,/name="password" type="password" required/)
 assert.ok(!html.includes(password));assert.match(html,/action="\/FOH\/access"/)
})
test('correct credentials issue a host-only secure HttpOnly signed session',async()=>{
 const r=await auth.handleFohLogin(post({username:'Investor',password}),bindings)
 assert.equal(r.status,303);assert.equal(r.headers.get('location'),'/FOH')
 const cookie=r.headers.get('set-cookie');for(const flag of ['__Host-nasaq_foh=','Path=/','Max-Age=28800','HttpOnly','Secure','SameSite=Lax'])assert.ok(cookie.includes(flag),flag)
 assert.doesNotMatch(cookie,/Domain=|local-only-test-password/)
 assert.equal(await auth.authenticatedFoh(cookieRequest(cookie.split(';')[0]),bindings),true)
})
test('wrong passwords and altered usernames do not create sessions',async()=>{
 for(const data of [{username:'Investor',password:'wrong'},{username:'investor',password},{username:'Investor',password:''}]){
  const r=await auth.handleFohLogin(post(data),bindings);assert.equal(r.status,401);assert.equal(r.headers.get('set-cookie'),null);assert.match(await r.text(),/Incorrect password/)
 }
})
test('cross-site, oversized and unconfigured login requests fail closed',async()=>{
 assert.equal((await auth.handleFohLogin(post({username:'Investor',password},'https://example.com'),bindings)).status,400)
 assert.equal((await auth.handleFohLogin(post({username:'Investor',password:'x'.repeat(3000)}),bindings)).status,400)
 assert.equal((await auth.handleFohLogin(post({username:'Investor',password}),{})).status,503)
})
test('tampered, expired and rotated-key sessions cannot authenticate',async()=>{
 const r=await auth.handleFohLogin(post({username:'Investor',password}),bindings),cookie=r.headers.get('set-cookie').split(';')[0]
 const tampered=cookie.slice(0,-1)+(cookie.endsWith('0')?'1':'0')
 assert.equal(await auth.authenticatedFoh(cookieRequest(tampered),bindings),false)
 assert.equal(await auth.authenticatedFoh(cookieRequest(cookie),{...bindings,FOH_SESSION_SECRET:'rotated-test-key'}),false)
 const payload=(Date.now()-1000)+'.'+'a'.repeat(32),signature=createHmac('sha256',bindings.FOH_SESSION_SECRET).update('Investor\n'+bindings.FOH_PASSWORD_HASH+'\n'+payload).digest('hex')
 assert.equal(await auth.authenticatedFoh(cookieRequest('__Host-nasaq_foh='+payload+'.'+signature),bindings),false)
})

test('privacy-restricted same-origin browser forms can sign in',async()=>{
 for(const origin of ['null',null]) {
  const headers={'Content-Type':'application/x-www-form-urlencoded','Sec-Fetch-Site':'same-origin','Sec-Fetch-Mode':'navigate','Sec-Fetch-Dest':'document'}
  if(origin!==null)headers.Origin=origin
  const request=new Request('https://nasaqfb.com/FOH/access',{method:'POST',headers,body:new URLSearchParams({username:'Investor',password})})
  const response=await auth.handleFohLogin(request,bindings)
  assert.equal(response.status,303)
  const cookie=response.headers.get('set-cookie').split(';')[0]
  assert.equal(await auth.authenticatedFoh(cookieRequest(cookie),bindings),true)
 }
})
test('opaque and cross-site origins cannot use the same-origin fallback',async()=>{
 for(const [origin,site,target] of [['null','cross-site','https://nasaqfb.com'],['null','same-site','https://nasaqfb.com'],['null',null,'https://nasaqfb.com'],[null,null,'https://nasaqfb.com'],['https://example.com','same-origin','https://nasaqfb.com'],['null','same-origin','https://example.com']]) {
  const headers={'Content-Type':'application/x-www-form-urlencoded'}
  if(origin!==null)headers.Origin=origin
  if(site!==null)headers['Sec-Fetch-Site']=site
  const response=await auth.handleFohLogin(new Request(target+'/FOH/access',{method:'POST',headers,body:new URLSearchParams({username:'Investor',password})}),bindings)
  assert.equal(response.status,400)
  assert.equal(response.headers.get('set-cookie'),null)
 }
 assert.equal(auth.privateFohResponse(new Response('protected content')).headers.get('referrer-policy'),'no-referrer')
})
