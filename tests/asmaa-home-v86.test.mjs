import assert from 'node:assert/strict'
import test from 'node:test'
import {readFile} from 'node:fs/promises'
import {createHash} from 'node:crypto'
import {Script} from 'node:vm'
const htmlPath='public/Asmaa/experience.html'
const read=async path=>await readFile(path,'utf8')
test('The three post-matrix sections are updated but all other anchors remain',async()=>{
 const html=await read(htmlPath)
 const manifest=JSON.parse(await read('public/Asmaa/release.json'))
 assert.equal(createHash('sha256').update(html).digest('hex'),manifest.sha256)
 for(const id of ['experience','about','discover','guide','chapters','sources','chapterJourneyNav','viewport','galleryView','detail','topicReader'])assert.ok(html.includes('id="'+id+'"'),id)
 assert.match(html,/<section[^>]*id="discover"[\s\S]*?data-i18n="ilhad1Title"/)
 assert.match(html,/<section[^>]*id="guide"[\s\S]*?data-i18n="practice4Title"/)
 const sourcePart=html.split('id="sources"')[1]?.split('</section>')[0]||''
 assert.ok(sourcePart.includes('href="/Asmaa/sources"'))
 assert.doesNotMatch(sourcePart,/class="source-links"|islamweb\.net|islamway\.net/)
 assert.equal((html.match(/data-go-topic=/g)||[]).length,6)
})
test('Arabic and English labels, study actions and source links stay functional',async()=>{
 const s=await read('public/Asmaa/editorial-content.js')
 new Script(s)
 for(const needle of ['guideLabel','sourcesHeading','ilhad1Title','practice4Title','sourceDetails','showTopic(p[0],p[1])','audio.islamweb.net'])assert.ok(s.includes(needle),needle)
 assert.ok(!s.includes("const src=document.getElementById('sources')"))
 const sources=await read('app/Asmaa/updates/page.tsx')
 assert.match(sources,/الإلحاد في أسماء الله/)
 assert.match(sources,/314593/)
})
