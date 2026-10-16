import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
export async function deploymentConfig() {
  const candidates = [];
  for (const entry of await readdir('dist', {withFileTypes:true})) {
    if (!entry.isDirectory()) continue;
    const configPath = path.join('dist', entry.name, 'wrangler.json');
    try {
      const config = JSON.parse(await readFile(configPath, 'utf8'));
      if (config.name === 'nasaq-coming-soon') candidates.push({path:configPath, config});
    } catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
  if (candidates.length !== 1) throw new Error('Build the website first. Expected one generated NASAQ Worker configuration.');
  const result = candidates[0];
  if (!result.config.main || !result.config.assets?.directory) throw new Error('Generated Worker is missing its entry point or assets directory.');
  result.workerPath = path.resolve(path.dirname(result.path), result.config.main);
  result.assetsPath = path.resolve(path.dirname(result.path), result.config.assets.directory);
  return result;
}
