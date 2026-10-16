import assert from 'node:assert/strict'
import test, {after} from 'node:test'
import {readFile} from 'node:fs/promises'
import {createHash} from 'node:crypto'
import {Miniflare} from 'miniflare'
const catalogue=JSON.parse(await readFile(new URL('../content/catalogue.json',import.meta.url),'utf8'))
const paths=['','about','approach','services','engagements','concepts','deliverables','contact','privacy',...catalogue.services.map(x=>'services/'+x.slug),...catalogue.concepts.map(x=>'concepts/'+x.slug)]
const {workerPath,assetsPath}=await (await import('../scripts/deployment-config.mjs')).deploymentConfig()
const mf=new Miniflare({modules:true,scriptPath:workerPath,modulesRules:[{type:'ESModule',include:['**/*.js','**/*.mjs']}],compatibilityDate:'2026-05-15',compatibilityFlags:['nodejs_compat'],assets:{directory:assetsPath,binding:'ASSETS',routerConfig:{has_user_worker:true,invoke_user_worker_ahead_of_assets:true}}})
after(()=>mf.dispose())
const get=path=>mf.dispatchFetch('https://nasaqfb.com'+path,{redirect:'manual',headers:{accept:'text/html'}})
test('root permanently redirects to the Arabic homepage',async()=>{const r=await get('/');assert.equal(r.status,308);assert.ok(r.headers.get('location').endsWith('/ar'))})
test('homepage styles, scripts, images and fonts are served through the deployed Worker',async()=>{
 const html=await (await get('/en')).text()
 const paths=[...new Set([...html.matchAll(/(?:src|href)="([^"?]+\.(?:webp|css|js|woff))"/g)].map(m=>m[1]))]
 assert.ok(paths.some(x=>x.endsWith('.css')),'Homepage has a stylesheet')
 assert.ok(paths.some(x=>x.endsWith('.js')),'Homepage has client scripts')
 for(const path of paths){
  const response=await mf.dispatchFetch('https://nasaqfb.com'+path)
  assert.equal(response.status,200,path)
  const type=response.headers.get('content-type')||''
  const expected=path.endsWith('.css')?/text\/css/:path.endsWith('.js')?/(?:application|text)\/javascript/:path.endsWith('.webp')?/image\/webp/:/font\/woff|application\/(?:font-woff|octet-stream)/
  assert.match(type,expected,path)
  assert.ok((await response.arrayBuffer()).byteLength>0,path)
 }
})
test('all 60 bilingual pages render with unique titles, metadata, correct direction and working internal links',async()=>{
 const pageImages={ar:new Set(),en:new Set()},imageHashes=new Set(),localizedImages=new Map()
 const titles=new Set(),valid=new Set(['/ar','/en']);for(const lang of ['ar','en'])for(const path of paths)valid.add(`/${lang}${path?'/'+path:''}`)
 for(const lang of ['ar','en'])for(const path of paths){
  const url=`/${lang}${path?'/'+path:''}`,response=await get(url),html=await response.text()
  assert.equal(response.status,200,url);assert.match(html,new RegExp(`<html[^>]*lang="${lang}"[^>]*dir="${lang==='ar'?'rtl':'ltr'}"`),url)
  assert.equal((html.match(/<h1[ >]/g)||[]).length,1,url)
  const title=html.match(/<title>(.*?)<\/title>/s)?.[1];assert.ok(title,url);assert.ok(!titles.has(title),`Duplicate title ${title}`);titles.add(title)
  assert.ok(html.includes('rel="canonical"'),url);assert.ok(html.includes('hrefLang="ar"')||html.includes('hreflang="ar"'),url)
  for(const [,link] of html.matchAll(/<a\b[^>]*href="(\/(?:ar|en)(?:\/[^"#?]*)?)[^\"]*"/g))assert.ok(valid.has(link),`${url} links to ${link}`)
  const main=html.match(/<main\b[\s\S]*?<\/main>/)?.[0]||''
  assert.doesNotMatch(main,/صورة تعبيرية|Concept image|<figcaption\b/,`No image-label captions: ${url}`)
  const photos=[...main.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)].map(x=>x[1])
  for(const src of photos){
   assert.ok(!pageImages[lang].has(src),`Repeated photograph across pages: ${url} ${src}`)
   pageImages[lang].add(src)
   assert.ok(!src.includes('advisory-'),`Rejected miniature image must not appear: ${url}`)
   if(lang==='ar'){
    const bytes=await readFile('dist/client'+src),hash=createHash('sha256').update(bytes).digest('hex')
    assert.ok(!imageHashes.has(hash),`Duplicate image content at another path: ${src}`);imageHashes.add(hash)
    assert.equal(bytes.subarray(8,12).toString(),'WEBP',`Web-optimised image: ${src}`)
   }
  }
  if(lang==='ar')localizedImages.set(path,photos);else assert.deepEqual(photos,localizedImages.get(path),`Language versions share the page image: ${url}`)
  if(path==='deliverables'||path===''){
   assert.ok(!main.includes('<table')&&!main.includes('doc-label'),`No sample tables on the deliverables experience: ${url}`)
  }
  if(path==='engagements'){
   const label=lang==='ar'?'ناقش النطاق المناسب':'Discuss the appropriate scope'
   assert.equal(main.split(label).length-1,1,`One shared package CTA: ${url}`)
   assert.ok(main.indexOf(label)>main.lastIndexOf('class="engagement-list"'),`CTA follows the package list: ${url}`)
  }
  if(path){
   assert.ok(main.includes('class="page-hero-visual"'),`Missing page visual: ${url}`)
   assert.match(main,/<img[^>]*class="wide-image"[^>]*alt="[^" ]/,`Missing expressive image description: ${url}`)
   assert.ok(!main.includes('<form'),`Enquiry form must live on the homepage: ${url}`)
  }else{
   assert.equal((main.match(/<form\b/g)||[]).length,1,`One homepage form: ${url}`)
   assert.equal((main.match(/\bid="contact"/g)||[]).length,1,`Unique contact anchor: ${url}`)
   const section=main.indexOf('class="contact-section section"'),form=main.indexOf('<form')
   assert.ok(section>0&&form>section,`Form inside final contact section: ${url}`)
   assert.equal(main.indexOf('<section ',section+1),-1,`Contact is the final homepage section: ${url}`)
  }
  if(path.startsWith('services/')){
   assert.ok(!main.includes('mini-table')&&!main.includes('doc-label'),`Service examples removed: ${url}`)
   const service=catalogue.services.find(x=>path==='services/'+x.slug)
   assert.ok(main.includes(`href="/${lang}?service=${service.id}#contact"`),`Service interest reaches homepage form: ${url}`)
  }
  assert.ok(!html.includes('Runtime Error'),url)
 }
 assert.equal(titles.size,60)
 assert.equal(pageImages.ar.size,33);assert.equal(pageImages.en.size,33);assert.equal(imageHashes.size,33)
})
test('unknown page returns a real 404',async()=>assert.equal((await get('/en/not-a-page')).status,404))
test('sitemap includes 60 URLs with bilingual alternates',async()=>{const r=await get('/sitemap.xml');assert.equal(r.status,200);const xml=await r.text();assert.equal((xml.match(/<loc>/g)||[]).length,60);assert.match(xml,/hreflang="ar"/);assert.match(xml,/hreflang="en"/)})
test('robots allows content and excludes API',async()=>{const r=await get('/robots.txt');assert.equal(r.status,200);assert.match(await r.text(),/Disallow: \/api\//)})
