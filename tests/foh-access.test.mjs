import {bindings as fohBindings, password as fohPassword, authService} from './foh-auth-fixture.mjs'
import assert from 'node:assert/strict'
import test, {after} from 'node:test'
import {readFile,readdir} from 'node:fs/promises'
import {Miniflare} from 'miniflare'

let workerPath='dist/server/index.js', assetsPath='dist/client'
try { ({workerPath,assetsPath}=await (await import('../scripts/deployment-config.mjs')).deploymentConfig()) }
catch(error) { if(error.code!=='ERR_MODULE_NOT_FOUND') throw error }
const mf=new Miniflare({bindings:fohBindings,outboundService:authService,modules:true,scriptPath:workerPath,modulesRules:[{type:'ESModule',include:['**/*.js','**/*.mjs']}],compatibilityDate:'2026-05-15',compatibilityFlags:['nodejs_compat'],assets:{directory:assetsPath,binding:'ASSETS',routerConfig:{has_user_worker:true,invoke_user_worker_ahead_of_assets:true}}})
after(()=>mf.dispose())
const get=(path,headers={},method='GET')=>mf.dispatchFetch('https://nasaqfb.com'+path,{headers,method,redirect:'manual'})
const auth=password=>({Authorization:'Basic '+Buffer.from('Investor:'+password).toString('base64')})
const protectedPaths=['/FOH','/FOH/','/foh','/fOh','/%46OH','/%2546OH','//FOH','/FOH?_rsc=test','/foh/slides/slide-01.webp','/foh/NASAQ_FOH_Partnership_Introduction.pdf','/foh/NASAQ_FOH_Partnership_Introduction.pptx','/assets/foh-page-example.js','/_vinext/image?url=%2Ffoh%2Fhero-1536.webp&w=768&q=80']

test('anonymous access cannot retrieve investor pages, RSC, slides, downloads or optimized images',async()=>{
 for(const path of protectedPaths) for(const method of ['GET','HEAD']) {
  const r=await get(path,{},method)
  assert.equal(r.status,401,path)
  assert.equal(r.headers.get('www-authenticate'),null,'Use the prefilled form instead of a browser popup')
  assert.match(r.headers.get('cache-control')||'',/no-store/)
  assert.match(r.headers.get('vary')||'',/Authorization/)
  assert.match(r.headers.get('x-robots-tag')||'',/noindex/)
  const body=await r.text()
  assert.doesNotMatch(body,/105,000|55,500|52.9%|SAR 350k/)
  if(method==='HEAD') assert.equal(body,'')
 }
})
test('wrong or malformed credentials never authorize access',async()=>{
 for(const header of ['', 'Bearer invalid','Basic !!!',auth('wrong').Authorization,'Basic '+Buffer.from('wrong:wrong').toString('base64'),'Basic '+Buffer.from('Investor:').toString('base64')]) {
  const r=await get('/FOH',{Authorization:header});assert.equal(r.status,401);await r.body?.cancel()
 }
})
test('financial client chunks are protected, including direct chunk URLs',async()=>{
 let matched=0
 for(const filename of await readdir(assetsPath+'/assets')) {
  if(!filename.endsWith('.js'))continue
  const text=await readFile(assetsPath+'/assets/'+filename,'utf8')
  if(!text.includes('NASAQ_FOH_Partnership_Introduction.pdf')&&!text.includes('cashBeforeFunding'))continue
  matched++
  const r=await get('/assets/'+filename);assert.equal(r.status,401,filename);await r.body?.cancel()
 }
 assert.ok(matched>0,'Financial client bundle identified')
})
test('correct password opens the page and all investor client chunks', {skip:!fohPassword},async()=>{
 const r=await get('/FOH',auth(fohPassword)),html=await r.text()
 assert.equal(r.status,200);assert.ok(html.includes('105,000'));assert.match(r.headers.get('cache-control')||'',/no-store/)
 for(const filename of await readdir(assetsPath+'/assets')) if(filename.startsWith('foh-')&&filename.endsWith('.js')) {
  const r=await get('/assets/'+filename,auth(fohPassword));assert.equal(r.status,200,filename);await r.body?.cancel()
 }
})

test('prefilled form login returns a cookie that opens the investor page',async()=>{
 const r=await mf.dispatchFetch('https://nasaqfb.com/FOH/access',{method:'POST',redirect:'manual',headers:{Origin:'https://nasaqfb.com','Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({username:'Investor',password:fohPassword}).toString()})
 assert.equal(r.status,303);assert.equal(r.headers.get('location'),'/FOH')
 const cookie=r.headers.get('set-cookie');assert.ok(cookie);assert.match(cookie,/HttpOnly/)
 const page=await get('/FOH',{Cookie:cookie.split(';')[0]});assert.equal(page.status,200);assert.ok((await page.text()).includes('105,000'))
})

test('browser form with a privacy-hidden Origin signs in through the remote relay',async()=>{
 const response=await mf.dispatchFetch('https://nasaqfb.com/FOH/access',{method:'POST',redirect:'manual',headers:{Origin:'null','Sec-Fetch-Site':'same-origin','Sec-Fetch-Mode':'navigate','Sec-Fetch-Dest':'document','Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({username:'Investor',password:fohPassword}).toString()})
 assert.equal(response.status,303)
 const cookie=response.headers.get('set-cookie').split(';')[0]
 const page=await get('/FOH',{Cookie:cookie})
 assert.equal(page.status,200)
 assert.ok((await page.text()).includes('105,000'))
})
