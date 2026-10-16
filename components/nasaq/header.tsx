'use client'
import {useState,useEffect,useRef} from 'react'
import {Button} from '@/components/ui/button'
import {href,contactHref,t,type Language} from '@/content/site'
export default function Header({lang,path}:{lang:Language;path:string}){
 const [open,setOpen]=useState(false)
 const button=useRef<HTMLButtonElement>(null)
 const links=[{p:'approach',ar:'المنهج',en:'Approach'},{p:'services',ar:'الخدمات',en:'Services'},{p:'concepts',ar:'مفاهيم المشاريع',en:'Project Concepts'},{p:'concepts/villas-palaces-service-kitchen',ar:'المشاريع الخاصة',en:'Private Projects'}]
 useEffect(()=>{function close(e:KeyboardEvent){if(e.key==='Escape'){setOpen(false);button.current?.focus()}}document.addEventListener('keydown',close);return()=>document.removeEventListener('keydown',close)},[])
 const [query,setQuery]=useState(''),[fragment,setFragment]=useState('')
 useEffect(()=>{
  function sync(){const q=new URLSearchParams(location.search),out=new URLSearchParams();for(const key of ['service','concept','type','intent']){const val=q.get(key);if(val)out.set(key,val)}setQuery(out.toString()?`?${out}`:'');setFragment(location.hash==='#contact'?'#contact':'')}
  sync();window.addEventListener('nasaq-interest',sync);window.addEventListener('hashchange',sync);window.addEventListener('popstate',sync)
  return()=>{window.removeEventListener('nasaq-interest',sync);window.removeEventListener('hashchange',sync);window.removeEventListener('popstate',sync)}
 },[])
 const nav=links.map(l=><a key={l.p} href={href(lang,l.p)} aria-current={path===l.p?'page':undefined}>{l[lang]}</a>)
 return <><a className="skip" href="#main">{t(lang,'انتقل إلى المحتوى','Skip to content')}</a><header className="site-header"><div className="wrap header-inner"><a className="brand" href={href(lang)} aria-label={t(lang,'نَسَق، الرئيسية','NASAQ, home')}><img className="brand-full" src="/brand/nasaq-horizontal.webp" alt="NASAQ نَسَق" width="10840" height="3558"/><span className="brand-mark"><img src="/brand/NASAQ_symbol_white_source.png" alt="" width="1386" height="1139"/></span></a><nav className="main-nav" aria-label={t(lang,'التنقل الرئيسي','Main navigation')}>{nav}</nav><div className="header-tools"><a className="lang-link" href={href(lang==='ar'?'en':'ar',path)+query+fragment} lang={lang==='ar'?'en':'ar'} aria-label={t(lang,'Switch to English','التبديل إلى العربية')}>{lang==='ar'?'EN':'عربي'}</a><a className="button" href={contactHref(lang,query)} onClick={()=>setOpen(false)}>{t(lang,'ناقش مشروعك','Discuss Your Project')}</a><Button variant="outline" className="menu-toggle" ref={button} aria-expanded={open} aria-controls="mobile-navigation" onClick={()=>setOpen(!open)}>{open?t(lang,'إغلاق','Close'):t(lang,'القائمة','Menu')}</Button></div></div><nav id="mobile-navigation" className={`mobile-nav${open?' open':''}`} aria-label={t(lang,'قائمة الهاتف','Mobile navigation')} hidden={!open}>{nav}<a href={contactHref(lang,query)} onClick={()=>setOpen(false)}>{t(lang,'ناقش مشروعك','Discuss Your Project')}</a><a href={href(lang,'about')}>{t(lang,'عن نَسَق','About NASAQ')}</a></nav></header></>
}
