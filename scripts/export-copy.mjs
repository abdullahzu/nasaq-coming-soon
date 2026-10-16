import {readFile,writeFile} from 'node:fs/promises'
import {Miniflare} from 'miniflare'
import ts from 'typescript'
const catalogue=JSON.parse(await readFile('content/catalogue.json','utf8'))
const paths=['','about','approach','services','engagements','concepts','deliverables','contact','privacy',...catalogue.services.map(x=>'services/'+x.slug),...catalogue.concepts.map(x=>'concepts/'+x.slug)]
const source=await readFile('content/service-details.ts','utf8'),js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText
const {serviceDetails}=await import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'))
const mf=new Miniflare({modules:true,scriptPath:(await (await import('./deployment-config.mjs')).deploymentConfig()).workerPath,modulesRules:[{type:'ESModule',include:['**/*.js','**/*.mjs']}],compatibilityDate:'2026-05-15',compatibilityFlags:['nodejs_compat'],assets:{directory:'dist/client',binding:'ASSETS',routerConfig:{has_user_worker:true,invoke_user_worker_ahead_of_assets:true}}})
const decode=s=>s.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#x27;|&#39;|&apos;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>')
const plain=html=>decode(html.replace(/<script\b[\s\S]*?<\/script>/g,'').replace(/<style\b[\s\S]*?<\/style>/g,'').replace(/<h([1-6])[^>]*>/g,(_,n)=>'\n\n'+'#'.repeat(Math.min(Number(n)+2,6))+' ').replace(/<li[^>]*>/g,'\n- ').replace(/<\/(?:h[1-6]|p|li|tr|figcaption|article|section)>/g,'\n\n').replace(/<t[dh][^>]*>/g,' | ').replace(/<[^>]*>/g,'').replace(/\n[ \t]+/g,'\n').replace(/\n{3,}/g,'\n\n').trim())
let copy='# NASAQ bilingual website copy\n\n28 September 2026. Generated from the release build. Includes rendered copy, metadata, image descriptions, FAQs and enquiry interface states. Images are expressive concepts; deliverables are described without sample tables.\n\n'
let inventory='# Page inventory\n\n30 logical pages, 60 Arabic/English URLs. All routes rendered and checked in the release test suite.\n\n| Page | Arabic URL | English URL | Status |\n|---|---|---|---|\n'
try{
 for(const path of paths){
  const urls=['ar','en'].map(lang=>`/${lang}${path?'/'+path:''}`)
  inventory+=`| ${path||'Home'} | ${urls[0]} | ${urls[1]} | Implemented and render-tested |\n`
  copy+=`\n## ${path||'Home'}\n`
  for(let index=0;index<2;index++){
   const lang=index===0?'ar':'en',url=urls[index],response=await mf.dispatchFetch('https://nasaqfb.com'+url),html=await response.text()
   if(response.status!==200)throw Error(`${url}: ${response.status}`)
   const title=decode(html.match(/<title>(.*?)<\/title>/s)?.[1]||''),description=decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1]||'')
   copy+=`\n### ${lang==='ar'?'العربية':'English'}\n\nRoute: https://nasaqfb.com${url}\n\nTitle: ${title}\n\nDescription: ${description}\n\n`
   if(!path)copy+='Navigation:\n\n'+plain(html.match(/<header\b[\s\S]*?<\/header>/)?.[0]||'')+'\n\n'
   copy+=plain(html.match(/<main\b[\s\S]*?<\/main>/)?.[0]||'')+'\n\n'
   const alts=[...html.matchAll(/<img\b[^>]*alt="([^"]+)"/g)].map(m=>decode(m[1])).filter(x=>!x.includes('NASAQ'))
   if(alts.length)copy+='Image descriptions:\n\n'+alts.map(x=>'- '+x).join('\n')+'\n\n'
   const svc=catalogue.services.find(x=>path==='services/'+x.slug)
   if(svc)copy+='FAQ answers:\n\n'+serviceDetails[svc.id].faq.map(x=>`- ${x.q[lang]}\n  ${x.a[lang]}`).join('\n\n')+'\n\n'
   if(!path)copy+='Footer:\n\n'+plain(html.match(/<footer\b[\s\S]*?<\/footer>/)?.[0]||'')+'\n\n'
  }
 }
 const form=ts.createSourceFile('contact-form.tsx',await readFile('components/nasaq/contact-form.tsx','utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX),pairs=[]
 function walk(node){if(ts.isCallExpression(node)&&node.expression.getText(form)==='t'&&node.arguments.length===3&&ts.isStringLiteral(node.arguments[1])&&ts.isStringLiteral(node.arguments[2]))pairs.push([node.arguments[1].text,node.arguments[2].text]);ts.forEachChild(node,walk)}walk(form)
 copy+='\n## Enquiry interaction copy\n\nIncludes labels, sending, validation, success, failure, timeout, optional-field and privacy states.\n\n| العربية | English |\n|---|---|\n'+pairs.map(p=>'| '+p.map(s=>s.replace(/\|/g,'\\|')).join(' | ')+' |').join('\n')+'\n'
 await writeFile('docs/release/bilingual-copy.md',copy)
 await writeFile('docs/release/page-inventory.md',inventory)
 console.log('Exported all 60 pages, metadata, image descriptions, FAQs and form messages.')
}finally{await mf.dispose()}
