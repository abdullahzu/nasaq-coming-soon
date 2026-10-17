import type {Metadata} from 'next'
import '../globals.css'
import './foh.css'
export const metadata:Metadata={metadataBase:new URL('https://nasaqfb.com'),title:'FOH Counter Partnership | NASAQ',description:'A partnership proposal for beverage stations and custom front bar counters. Explore the product platform, complete-order economics, financial scenarios and investor presentation.',alternates:{canonical:'/FOH'},openGraph:{title:'NASAQ FOH Counter Partnership',description:'Beverage stations. Custom front bars. A complete solution business.',url:'https://nasaqfb.com/FOH',images:[{url:'https://nasaq-coming-soon.abdullah-zu.chatgpt.site/foh/hero-1536.webp',width:1536,height:864}]},icons:{icon:'/favicon.svg'}}
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en" dir="ltr"><body>{children}</body></html>}
