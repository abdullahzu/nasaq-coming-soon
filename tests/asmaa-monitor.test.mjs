import assert from 'node:assert/strict'
import test from 'node:test'
import {readFile} from 'node:fs/promises'
import {createHash} from 'node:crypto'
test('Asmaa sourced-reading document matches signed release',async()=>{
 const html=await readFile('public/Asmaa/experience.html','utf8')
 const v=JSON.parse(await readFile('public/Asmaa/release.json','utf8'))
 assert.equal(createHash('sha256').update(html).digest('hex'),v.sha256)
 assert.match(v.source,/v7\.4 matrix\/gallery unchanged/)
 assert.equal(v.scholarlyApproved,false)
 assert.equal(v.containsCMS,false)
 assert.match(html,/noindex,nofollow/)
})
test('Asmaa monitoring includes noindex live integrity diagnostics',async()=>{
 const html=await readFile('public/Asmaa/health.html','utf8')
 assert.match(html,/crypto\.subtle\.digest\('SHA-256'/)
 assert.match(html,/cache:'no-store'/)
 assert.match(html,/noindex,nofollow/)
 assert.doesNotMatch(html,/sendBeacon|localStorage|sessionStorage/)
 const check=await readFile('scripts/check-live.mjs','utf8')
 for(const p of ['/Asmaa','/Asmaa/updates','/Asmaa/health.html','/Asmaa/release.json','/Asmaa/experience.html'])assert.ok(check.includes(p),p)
 assert.ok(check.includes('createHash'))
})

test('Editorial notes are present and syntactically valid',async()=>{
 const {Script}=await import('node:vm');const script=await readFile('public/Asmaa/editorial-content.js','utf8');new Script(script);
 assert.match(script,/islamweb\.net/);assert.match(script,/islamway\.net/);assert.match(script,/const entries=/);assert.match(script,/const TOPICS=/);
 const html=await readFile('public/Asmaa/experience.html','utf8');assert.match(html,/src="\/Asmaa\/editorial-content\.js"/);
 const page=await readFile('app/Asmaa/page.tsx','utf8');assert.doesNotMatch(page,/V8\.4|سجل التطوير|معاينة/);
 const sourcePage=await readFile('app/Asmaa/updates/page.tsx','utf8');assert.match(sourcePage,/المصادر والمنهج/);
})
