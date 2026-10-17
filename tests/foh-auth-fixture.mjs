import {readFile} from 'node:fs/promises'
import {pbkdf2Sync} from 'node:crypto'
import ts from 'typescript'
import assert from 'node:assert/strict'
export const password='local-only-test-password'
export const bindings={FOH_PASSWORD_SALT:'local-only-salt',FOH_PASSWORD_HASH:pbkdf2Sync(password,'local-only-salt',100000,32,'sha256').toString('hex'),FOH_SESSION_SECRET:'local-only-signing-key-not-used-in-production'}
const source=await readFile(new URL('../worker/foh-auth.ts',import.meta.url),'utf8')
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText
export const auth=await import('data:text/javascript;base64,'+Buffer.from(compiled).toString('base64'))
export async function authService(request){
 const url=new URL(request.url)
 assert.equal(url.origin,'https://nasaq-coming-soon.abdullah-zu.chatgpt.site')
 if(url.pathname==='/_foh-session')return new Response(null,{status:await auth.authenticatedFoh(request,bindings)?204:401})
 if(url.pathname==='/FOH/access')return auth.handleFohLogin(request,bindings)
 throw new Error('Unexpected outgoing request: '+url.pathname)
}
