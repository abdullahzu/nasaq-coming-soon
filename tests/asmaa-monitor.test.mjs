import assert from 'node:assert/strict'
import test from 'node:test'
import {readFile} from 'node:fs/promises'
import {createHash} from 'node:crypto'
test('Asmaa monitoring preserves approved explorer byte-for-byte',async()=>{
 const html=await readFile('public/Asmaa/experience.html','utf8')
 const v=JSON.parse(await readFile('public/Asmaa/release.json','utf8'))
 assert.equal(createHash('sha256').update(html).digest('hex'),v.sha256)
 assert.equal(v.source,'v7.4 unchanged')
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
