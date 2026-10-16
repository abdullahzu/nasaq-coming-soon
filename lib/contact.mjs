import catalogue from '../content/catalogue.json' with {type:'json'}
// Bounded, short-lived maps provide best-effort rate and duplicate controls per
// Worker isolate. No enquiry content is logged or stored in a database.
const attempts=new Map(),receipts=new Map(),inflight=new Map()
const limits={name:120,company:160,location:160,contact:200,note:2400}
const types=new Set(['restaurant','renovation','central','hospitality','private','review','other'])
const stages=new Set(['','idea','space','planning','offers','other'])
const json=(body,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store'}})
const escape=value=>value.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))
const digest=async value=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value))),b=>b.toString(16).padStart(2,'0')).join('')
const email=value=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
function prune(map,now){for(const [k,v] of map)if(v.expires<=now)map.delete(k);while(map.size>=1000)map.delete(map.keys().next().value)}
export async function handleContact(request,env){
 const origin=request.headers.get('origin')
 try{if(!origin||new URL(origin).origin!==new URL(request.url).origin)return json({success:false},403)}catch{return json({success:false},403)}
 if(!request.headers.get('content-type')?.toLowerCase().startsWith('application/json'))return json({success:false},415)
 if(Number(request.headers.get('content-length'))>16384)return json({success:false},413)
 let payload
 try{
  const reader=request.body?.getReader();if(!reader)return json({success:false},400)
  const chunks=[];let size=0
  for(;;){const part=await reader.read();if(part.done)break;size+=part.value.byteLength;if(size>16384){await reader.cancel();return json({success:false},413)}chunks.push(part.value)}
  const bytes=new Uint8Array(size);let offset=0;for(const c of chunks){bytes.set(c,offset);offset+=c.byteLength}
  payload=JSON.parse(new TextDecoder().decode(bytes))
 }catch{return json({success:false},400)}
 if(!payload||typeof payload!=='object'||Array.isArray(payload))return json({success:false},400)
 if(typeof payload.website==='string'&&payload.website.trim())return json({success:true})
 const fields={}
 for(const [key,max] of Object.entries(limits)){
  if(payload[key]!=null&&typeof payload[key]!=='string')return json({success:false},400)
  const value=(payload[key]||'').trim()
  if(value.length>max||/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value))return json({success:false},400)
  fields[key]=value
 }
 if(!fields.name||!fields.contact||!fields.note||!types.has(payload.projectType))return json({success:false},400)
 fields.contact=fields.contact.replace(/[٠-٩]/g,c=>String(c.charCodeAt(0)-1632)).replace(/[۰-۹]/g,c=>String(c.charCodeAt(0)-1776))
 const digits=fields.contact.replace(/\D/g,'')
 if(!email(fields.contact)&&(!/^\+?[\d\s().-]{7,24}$/.test(fields.contact)||digits.length<7||digits.length>16))return json({success:false},400)
 if(!['ar','en'].includes(payload.language)||!stages.has(payload.stage||''))return json({success:false},400)
 if(payload.service&&!/^S(0[1-9]|10)$/.test(payload.service))return json({success:false},400)
 if(payload.concept&&!/^C(0[1-9]|1[01])$/.test(payload.concept))return json({success:false},400)
 fields.projectType=payload.projectType;fields.stage=payload.stage||'';
 const service=catalogue.services.find(x=>x.id===payload.service),concept=catalogue.concepts.find(x=>x.id===payload.concept)
 fields.service=service?`${service.name.en} / ${service.name.ar} (${service.id})`:''
 fields.concept=concept?`${concept.name.en} / ${concept.name.ar} (${concept.id})`:''
 const now=Date.now(),fingerprint=await digest(JSON.stringify(fields)),sender=await digest(fields.contact.toLowerCase())
 prune(receipts,now);prune(attempts,now)
 if(receipts.has(fingerprint))return json({success:true})
 if(inflight.has(fingerprint))return inflight.get(fingerprint).then(status=>json({success:status===200},status))
 const count=attempts.get(sender)
 if(count&&count.count>=4)return json({success:false},429)
 if(!env?.EMAIL?.send||inflight.size>=64)return json({success:false},503)
 attempts.set(sender,{count:(count?.count||0)+1,expires:count?.expires||now+600000})
 const labels={name:'Name / الاسم',company:'Company or project / الشركة أو المشروع',projectType:'Project type / نوع المشروع',location:'Location / الموقع',contact:'Contact / التواصل',note:'Project brief / نبذة المشروع',stage:'Stage / المرحلة',service:'Service / الخدمة',concept:'Concept / المفهوم'}
 const entries=Object.entries(labels).map(([key,label])=>[label,fields[key]||'—'])
 const message={to:'growth@nasaqfb.com',from:{email:'website@nasaqfb.com',name:'NASAQ Website'},subject:'NASAQ — Project enquiry',text:entries.map(([k,v])=>`${k}: ${v}`).join('\n'),html:`<div dir="${payload.language==='ar'?'rtl':'ltr'}"><h2>NASAQ</h2><table>${entries.map(([k,v])=>`<tr><th style="text-align:start;padding:12px">${escape(k)}</th><td style="white-space:pre-wrap;padding:12px">${escape(v)}</td></tr>`).join('')}</table></div>`,...(email(fields.contact)?{replyTo:fields.contact}:{})}
 const pending=(async()=>{try{await env.EMAIL.send(message);receipts.set(fingerprint,{expires:Date.now()+900000});return 200}catch{return 502}})()
 inflight.set(fingerprint,pending)
 try{const status=await pending;return json({success:status===200},status)}finally{inflight.delete(fingerprint)}
}
