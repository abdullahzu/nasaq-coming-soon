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
  for (const authorization of ['', 'Basic '+Buffer.from('investor:incorrect').toString('base64')]) {
    const response=await fetch(new URL(path,origin),{headers:{Authorization:authorization,'Cache-Control':'no-cache'},signal:AbortSignal.timeout(30000)});
    assert.equal(response.status,401,path);
    assert.match(response.headers.get('www-authenticate')||'',/Basic realm="NASAQ Investor"/);
    assert.match(response.headers.get('cache-control')||'',/no-store/);
    assert.match(response.headers.get('x-robots-tag')||'',/noindex/);
    assert.doesNotMatch(await response.text(),/105,000|55,500|52.9%/);
  }
  console.log('Protected '+path);
}
