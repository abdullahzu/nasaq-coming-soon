import {env} from 'cloudflare:workers'
import {handleContact} from '@/lib/contact.mjs'
export async function POST(request:Request){return handleContact(request,env)}
