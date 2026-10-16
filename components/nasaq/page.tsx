import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {allPaths,services,concepts,pageName,href,t,type Language} from '@/content/site'
import {serviceDetails} from '@/content/service-details'
import conceptDetails from '@/content/concept-details.json'
import {visuals,serviceVisuals,conceptVisuals,coreVisuals} from '@/content/social-visuals'
import Header from '@/components/nasaq/header'
import {Footer} from '@/components/nasaq/common'
import Home from '@/components/nasaq/home'
import {CorePage,coreLeads} from '@/components/nasaq/core-pages'
import {ServicePage,ConceptPage} from '@/components/nasaq/detail-pages'
type Props={params:Promise<{lang:string;slug?:string[]}>}
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {lang:raw,slug=[]}=await params,lang:Language=raw==='en'?'en':'ar',path=slug.join('/')
 const service=services.find(s=>path===`services/${s.slug}`),concept=concepts.find(c=>path===`concepts/${c.slug}`)
 const visual=visuals[service?serviceVisuals[service.id]:concept?conceptVisuals[concept.id]:coreVisuals[path]??'hero']
 const title=`${pageName(path)[lang]} | ${lang==='ar'?'نَسَق':'NASAQ'}`
 const description=service?serviceDetails[service.id].intro[lang]:concept?conceptDetails[concept.id as keyof typeof conceptDetails].intro[lang]:coreLeads[path]?.[lang]??t(lang,'نخطّط لمنظومة الحركة والتشغيل، ثم نصمّم المساحة حولها. تصميم واستشارات مرافق الأغذية والمشروبات في المملكة العربية السعودية.','We plan the operational flow, then design the space around it. Foodservice Design & Advisory in Saudi Arabia.')
 return {title,description,alternates:{canonical:href(lang,path),languages:{ar:href('ar',path),en:href('en',path),'x-default':href('ar',path)}},openGraph:{title,description,url:href(lang,path),siteName:'NASAQ',locale:lang==='ar'?'ar_SA':'en_GB',alternateLocale:lang==='ar'?'en_GB':'ar_SA',type:'website',images:[{url:visual.src,width:1536,height:1024,alt:visual[lang]}]},twitter:{card:'summary_large_image',title,description,images:[visual.src]}}
}
export default async function Page({params}:Props){
 const {lang:raw,slug=[]}=await params
 if(raw!=='ar'&&raw!=='en')notFound()
 const lang:Language=raw,path=slug.join('/')
 if(!allPaths.includes(path))notFound()
 const service=services.find(s=>path===`services/${s.slug}`),concept=concepts.find(c=>path===`concepts/${c.slug}`),parent=service?'services':concept?'concepts':''
 const jsonLd={'@context':'https://schema.org','@type':'Organization',name:'NASAQ',alternateName:'نَسَق',url:'https://nasaqfb.com',logo:'https://nasaqfb.com/brand/NASAQ_logo_horizontal_primary_source.png',email:'growth@nasaqfb.com',description:'Foodservice Design & Advisory',areaServed:{'@type':'Country',name:'Saudi Arabia'}}
 return <><Header lang={lang} path={path}/><main id="main">{path&&<nav className="breadcrumb wrap" aria-label={t(lang,'مسار الصفحة','Breadcrumb')}><a href={href(lang)}>{t(lang,'الرئيسية','Home')}</a><span aria-hidden="true">/</span>{parent&&<><a href={href(lang,parent)}>{pageName(parent)[lang]}</a><span aria-hidden="true">/</span></>}<span aria-current="page">{pageName(path)[lang]}</span></nav>}{!path?<Home lang={lang}/>:service?<ServicePage lang={lang} id={service.id}/>:concept?<ConceptPage lang={lang} id={concept.id}/>:<CorePage lang={lang} path={path}/>}</main><Footer lang={lang}/>{!path&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd).replace(/</g,'\\u003c')}}/>}</>
}
