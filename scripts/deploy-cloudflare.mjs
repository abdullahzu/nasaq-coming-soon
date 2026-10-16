import { spawnSync } from 'node:child_process';
import { deploymentConfig } from './deployment-config.mjs';
const options = process.argv.slice(2);
if (options.some(option => option !== '--dry-run')) throw new Error('Only --dry-run is supported.');
const {path:configPath} = await deploymentConfig();
const cli = new URL('../node_modules/wrangler/bin/wrangler.js', import.meta.url);
const result = spawnSync(process.execPath, [cli.pathname, 'deploy', '--config', configPath, ...options], {stdio:'inherit', env:{...process.env, WRANGLER_SEND_METRICS:'false'}});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
