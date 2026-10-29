import assert from 'node:assert/strict';
const origin = process.argv[2];
if (origin !== 'https://nasaqfb.com') throw new Error('This release check targets the official NASAQ domain.');
const routes = ['/ar', '/en', '/ar/services', '/en/services', '/ar/concepts', '/en/concepts', '/ar/engagements', '/en/deliverables'];
const assets = new Set();
for (const path of routes) {
  const response = await fetch(new URL(path, origin), {headers:{'Cache-Control':'no-cache'}, signal:AbortSignal.timeout(30000)});
  assert.equal(response.status, 200, path);
  const html = await response.text();
  assert.match(html, new RegExp(`<html[^>]*lang="${path.split('/')[1]}"`), path);
  if (path === '/en') for (const match of html.matchAll(/(?:src|href)="(\/assets\/[^"?]+\.(?:css|js))"/g)) assets.add(match[1]);
  if (path === '/ar' || path === '/en') assert.ok(html.includes('home-concepts-simple-v2'), `Official domain is not serving the current release: ${path}`);
  else assert.ok(html.includes('page-hero-visual'), `Dedicated page missing: ${path}`);
  console.log('OK '+path);
}
assert.ok([...assets].some(path=>path.endsWith('.css')), 'Homepage must load its stylesheet');
assert.ok([...assets].some(path=>path.endsWith('.js')), 'Homepage must load its client scripts');
for (const path of assets) {
  const response = await fetch(new URL(path, origin), {signal:AbortSignal.timeout(30000)});
  assert.equal(response.status, 200, path);
  assert.match(response.headers.get('content-type') || '', path.endsWith('.css') ? /text\/css/ : /(?:application|text)\/javascript/, path);
  await response.arrayBuffer();
  console.log('OK '+path);
}

// The investor page and files must refuse anonymous and incorrect credentials.
for (const path of ['/FOH', '/FOH?_rsc=security-check', '/foh/NASAQ_FOH_Partnership_Introduction.pdf', '/foh/NASAQ_FOH_Partnership_Introduction.pptx', '/foh/slides/slide-01.webp']) {
  for (const authorization of ['', 'Basic '+Buffer.from('Investor:incorrect').toString('base64')]) {
    const response=await fetch(new URL(path,origin),{headers:{Authorization:authorization,'Cache-Control':'no-cache'},signal:AbortSignal.timeout(30000)});
    assert.equal(response.status,401,path);
    assert.equal(response.headers.get('www-authenticate'),null,'No browser credential popup');
    assert.equal(response.headers.get('referrer-policy'),'same-origin','Form login must preserve the browser Origin');
    assert.match(response.headers.get('cache-control')||'',/no-store/);
    assert.match(response.headers.get('x-robots-tag')||'',/noindex/);
    const loginHtml=await response.text();assert.doesNotMatch(loginHtml,/105,000|55,500|52.9%/);assert.ok(loginHtml.includes('value="Investor" readonly'));assert.ok(loginHtml.includes('action="/FOH/access"'));assert.doesNotMatch(loginHtml, /name="password"[^>]*value=/);
  }
  console.log('Protected '+path);
}

// Reproduce HTML form navigation with privacy-hidden Origin, without using a real password.
for(const [site,expected] of [['same-origin',401],['cross-site',400]]) {
 const response=await fetch(new URL('/FOH/access',origin),{method:'POST',redirect:'manual',headers:{Origin:'null','Sec-Fetch-Site':site,'Sec-Fetch-Mode':'navigate','Sec-Fetch-Dest':'document','Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({username:'Investor',password:'invalid-release-check'}),signal:AbortSignal.timeout(30000)});
 assert.equal(response.status,expected,site+' form validation');
 if(site==='same-origin')assert.match(await response.text(),/Incorrect password/);
 else await response.body?.cancel();
 console.log('Browser form '+site+' validated');
}


// ASMAA v8.4: Public preview is a separate release surface. The NASAQ homepage
// checks above must not be treated as evidence that /Asmaa itself is deployed.
const {createHash}=await import('node:crypto')
const previewPaths=['/Asmaa','/Asmaa/updates','/Asmaa/health.html']
for(const path of previewPaths){
  const response=await fetch(new URL(path,origin),{headers:{'Cache-Control':'no-cache'},signal:AbortSignal.timeout(30000)})
  assert.equal(response.status,200,path)
  assert.match(response.headers.get('content-type')||'',/text\/html/i,path)
  const page=await response.text()
  assert.ok(page.toLowerCase().includes('noindex'),path+' must be preview-only')
  if(path==='/Asmaa')assert.ok(page.includes('/Asmaa/experience.html'),'The preview iframe is absent')
  if(path.endsWith('/updates'))assert.ok(page.includes('سجل تطوير'),'The public change log is absent')
  console.log('ASMAA OK '+path)
}
const manifestResponse=await fetch(new URL('/Asmaa/release.json',origin),{headers:{'Cache-Control':'no-cache'},signal:AbortSignal.timeout(30000)})
assert.equal(manifestResponse.status,200,'/Asmaa/release.json')
const release=await manifestResponse.json()
assert.equal(release.release,'v8.4-preview-monitoring','The official site has an outdated /Asmaa release')
assert.equal(release.scholarlyApproved,false)
assert.equal(release.containsCMS,false)
assert.match(release.sha256,/^[a-f0-9]{64}$/)
const experienceResponse=await fetch(new URL('/Asmaa/experience.html',origin),{headers:{'Cache-Control':'no-cache'},signal:AbortSignal.timeout(30000)})
assert.equal(experienceResponse.status,200,'/Asmaa/experience.html')
assert.match(experienceResponse.headers.get('content-type')||'',/text\/html/i)
const experienceBytes=Buffer.from(await experienceResponse.arrayBuffer())
assert.ok(experienceBytes.length>100000,'Truncated Asmaa interactive HTML')
assert.equal(createHash('sha256').update(experienceBytes).digest('hex'),release.sha256,'Public preview differs from approved source')
console.log('ASMAA release and byte-level integrity verified: '+release.release)
