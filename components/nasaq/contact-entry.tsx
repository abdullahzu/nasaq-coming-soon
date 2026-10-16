'use client'
import {useEffect,useState} from 'react'
import {contactHref,t,type Language} from '@/content/site'

// Keep existing /contact links useful while the enquiry form lives on the homepage.
export default function ContactEntry({lang}:{lang:Language}){
 const [query,setQuery]=useState('')
 useEffect(()=>{
  const current=new URLSearchParams(location.search),next=new URLSearchParams()
  for(const key of ['service','concept','type','intent']){const value=current.get(key);if(value)next.set(key,value)}
  setQuery(next.toString())
 },[])
 return <a className="button" href={contactHref(lang,query)}>{t(lang,'انتقل إلى نموذج مناقشة المشروع','Open the project enquiry form')}<span className="arrow" aria-hidden="true">↗</span></a>
}
