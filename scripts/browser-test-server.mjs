// Test-only server for the real production bundle. No email bindings or secrets.
import {Miniflare} from 'miniflare'
import {deploymentConfig} from './deployment-config.mjs'
const {workerPath, assetsPath}=await deploymentConfig()
const mf=new Miniflare({
  host:'127.0.0.1', port:4179,
  modules:true, scriptPath:workerPath,
  modulesRules:[{type:'ESModule',include:['**/*.js','**/*.mjs']}],
  compatibilityDate:'2026-05-15', compatibilityFlags:['nodejs_compat'],
  assets:{directory:assetsPath,binding:'ASSETS',routerConfig:{has_user_worker:true,invoke_user_worker_ahead_of_assets:true}},
  outboundService:()=>new Response('External services disabled in browser tests',{status:503}),
})
await mf.ready
console.log('Browser test server ready at http://127.0.0.1:4179')
for(const signal of ['SIGTERM','SIGINT'])process.once(signal,async()=>{await mf.dispose();process.exit(0)})
