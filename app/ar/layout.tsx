import type {Metadata} from 'next'
import '../globals.css'
export const metadata:Metadata={metadataBase:new URL('https://nasaqfb.com'),applicationName:'NASAQ',icons:{icon:'/favicon.svg'}}
export default function Layout({children}:{children:React.ReactNode}){return <html lang="ar" dir="rtl"><body>{children}</body></html>}
