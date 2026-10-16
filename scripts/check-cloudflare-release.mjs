import assert from 'node:assert/strict';
import {setTimeout} from 'node:timers/promises';

const {GITHUB_REPOSITORY: repository, GITHUB_SHA: sha, GITHUB_TOKEN: token} = process.env;
assert.equal(repository, 'abdullahzu/nasaq-coming-soon');
assert.match(sha || '', /^[a-f0-9]{40}$/);
assert.ok(token, 'The workflow token is required to read deployment checks.');
const deadline = Date.now() + 10 * 60 * 1000;
while (Date.now() < deadline) {
  const response = await fetch(`https://api.github.com/repos/${repository}/commits/${sha}/check-runs`, {
    headers: {Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28'},
    signal: AbortSignal.timeout(30000),
  });
  assert.equal(response.status, 200, 'Could not read the commit deployment checks.');
  const {check_runs: checks} = await response.json();
  const build = checks.filter(check => check.name === 'Workers Builds: nasaq-coming-soon' && check.app?.slug === 'cloudflare-workers-and-pages')
    .sort((a,b) => b.id-a.id)[0];
  if (build?.status === 'completed') {
    assert.equal(build.conclusion, 'success', `Cloudflare build did not succeed. Review ${build.html_url}`);
    console.log(`Cloudflare build passed for ${sha}: ${build.html_url}`);
    break;
  }
  if (Date.now() + 15000 >= deadline) throw new Error('Cloudflare deployment did not complete within ten minutes. Review Workers Builds in the commit checks.');
  console.log(`Waiting for Cloudflare build: ${build?.status || 'not started'}`);
  await setTimeout(15000);
}
