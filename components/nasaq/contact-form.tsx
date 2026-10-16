'use client'
import {useEffect,useState,type FormEvent} from 'react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import {t,href,services,concepts,projectTypes,stages,type Language} from '@/content/site'

export default function ContactForm({lang}:{lang:Language}){
 const [projectType,setProjectType]=useState(''),[service,setService]=useState(''),[concept,setConcept]=useState('')
 const [state,setState]=useState<'idle'|'sending'|'success'|'error'>('idle')
 const [error,setError]=useState(''),[errors,setErrors]=useState<Record<string,string>>({})
 useEffect(()=>{
  const q=new URLSearchParams(location.search),s=q.get('service')||'',c=q.get('concept')||'',p=q.get('type')||''
  if(services.some(x=>x.id===s))setService(s);else if(q.get('intent')==='layout-review')setService('S05')
  if(concepts.some(x=>x.id===c))setConcept(c)
  if(projectTypes.some(x=>x.id===p))setProjectType(p);else if(c==='C11')setProjectType('private')
 },[])
 function updateInterest(key:string,value:string){const u=new URL(location.href);if(value)u.searchParams.set(key,value);else u.searchParams.delete(key);history.replaceState(null,'',u.pathname+u.search+u.hash);window.dispatchEvent(new Event('nasaq-interest'))}
 const label=(ar:string,en:string,required=false)=><>{t(lang,ar,en)}{required?<span aria-hidden="true"> *</span>:<span className="optional"> {t(lang,'(اختياري)','(optional)')}</span>}</>
 const fieldError=(key:string)=>errors[key]?<span id={`${key}-error`} className="field-error">{errors[key]}</span>:null
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();if(state==='sending')return
  const f=event.currentTarget,payload=Object.fromEntries(new FormData(f).entries()) as Record<string,string>
  payload.language=lang;payload.service=service;payload.concept=concept
  const next:Record<string,string>={}
  for(const key of ['name','contact','projectType','note'])if(!payload[key]?.trim())next[key]=t(lang,'يرجى تعبئة هذا الحقل.','Please complete this field.')
  const normal=(payload.contact||'').replace(/[٠-٩]/g,c=>String(c.charCodeAt(0)-1632)).replace(/[۰-۹]/g,c=>String(c.charCodeAt(0)-1776)),digits=normal.replace(/\D/g,'')
  if(normal&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normal)&&(!/^\+?[\d\s().-]{7,24}$/.test(normal)||digits.length<7||digits.length>16))next.contact=t(lang,'أدخل بريداً إلكترونياً أو رقم جوال صالحاً.','Enter a valid email address or mobile number.')
  setErrors(next)
  if(Object.keys(next).length){f.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();return}
  setState('sending');setError('')
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),20000)
  try{
   const response=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:controller.signal}),result=await response.json()
   if(!response.ok||!result.success){setError(response.status===429?t(lang,'تم إرسال عدة طلبات خلال فترة قصيرة. يرجى المحاولة لاحقاً.','Several enquiries were submitted recently. Please try again later.'):t(lang,'تعذر إرسال الرسالة الآن. احتفظنا بمدخلاتك؛ أعد المحاولة أو تواصل عبر growth@nasaqfb.com.','We could not send your message. Your entries are still here; try again or contact growth@nasaqfb.com.'));setState('error');return}
   setState('success')
  }catch{setState('error');setError(t(lang,'تعذر تأكيد الإرسال. احتفظنا بمدخلاتك؛ تحقق من اتصالك وأعد المحاولة.','Delivery could not be confirmed. Your entries are still here; check your connection and try again.'))}finally{clearTimeout(timer)}
 }
 if(state==='success')return <div className="form-success" role="status"><span className="eyebrow">{t(lang,'تم الإرسال','Enquiry sent')}</span><h2>{t(lang,'شكراً لمشاركة مشروعك.','Thank you for sharing your project.')}</h2><p>{t(lang,'تم إرسال رسالتك بنجاح. سيتواصل معك فريق نَسَق بعد مراجعتها.','Your message was sent successfully. The NASAQ team will review it and get back to you.')}</p><a className="text-link" href={href(lang)}>{t(lang,'العودة إلى الرئيسية','Return to the homepage')}</a></div>
 return <form onSubmit={submit} noValidate className="enquiry-form" aria-label={t(lang,'نموذج مناقشة المشروع','Project enquiry form')} aria-busy={state==='sending'}>
  <p className="form-note">{t(lang,'الحقول المعلّمة بنجمة مطلوبة.','Fields marked with an asterisk are required.')}</p>
  {concept&&<div className="interest-note"><span>{t(lang,'المفهوم محل الاهتمام: ','Concept of interest: ')}{concepts.find(x=>x.id===concept)?.name[lang]}</span><button type="button" onClick={()=>{setConcept('');updateInterest('concept','')}}>{t(lang,'إزالة','Remove')}</button></div>}
  <div className="form-grid">
   <div className="field"><label htmlFor="name">{label('الاسم','Name',true)}</label><Input id="name" name="name" autoComplete="name" maxLength={120} required aria-invalid={!!errors.name} aria-describedby={errors.name?'name-error':undefined} placeholder={t(lang,'الاسم الكامل','Full name')}/>{fieldError('name')}</div>
   <div className="field"><label htmlFor="company">{label('الشركة أو المشروع','Company or project')}</label><Input id="company" name="company" autoComplete="organization" maxLength={160} placeholder={t(lang,'اسم الشركة أو المشروع','Company or project name')}/></div>
   <div className="field"><label htmlFor="projectType">{label('نوع المشروع','Project type',true)}</label><select id="projectType" name="projectType" required value={projectType} onChange={e=>{setProjectType(e.target.value);updateInterest('type',e.target.value)}} aria-invalid={!!errors.projectType} aria-describedby={errors.projectType?'projectType-error':undefined}><option value="">{t(lang,'اختر نوع المشروع','Choose a project type')}</option>{projectTypes.map(x=><option key={x.id} value={x.id}>{x[lang]}</option>)}</select>{fieldError('projectType')}</div>
   <div className="field"><label htmlFor="location">{label('المدينة والدولة','City and country')}</label><Input id="location" name="location" autoComplete="address-level2" maxLength={160} placeholder={t(lang,'مثال: الرياض، السعودية','Example: Riyadh, Saudi Arabia')}/></div>
   <div className="field"><label htmlFor="enquiry-contact">{label('البريد الإلكتروني أو الجوال','Email or mobile',true)}</label><Input id="enquiry-contact" name="contact" autoComplete="email" dir="auto" maxLength={200} required aria-invalid={!!errors.contact} aria-describedby={errors.contact?'contact-error':undefined} placeholder={t(lang,'بيانات التواصل المفضلة','Your preferred contact details')}/>{fieldError('contact')}</div>
   <div className="field"><label htmlFor="stage">{label('مرحلة المشروع','Project stage')}</label><select id="stage" name="stage"><option value="">{t(lang,'اختر المرحلة','Choose a stage')}</option>{stages.map(x=><option value={x.id} key={x.id}>{x[lang]}</option>)}</select></div>
   <div className="field full"><label htmlFor="service">{label('الخدمة محل الاهتمام','Service of interest')}</label><select id="service" name="service" value={service} onChange={e=>{setService(e.target.value);updateInterest('service',e.target.value)}}><option value="">{t(lang,'ساعدوني في تحديد الخدمة المناسبة','Help me choose the right service')}</option>{services.map(x=><option value={x.id} key={x.id}>{x.name[lang]}</option>)}</select></div>
   <div className="field full"><label htmlFor="note">{label('نبذة مختصرة عن المشروع','Short project brief',true)}</label><Textarea id="note" name="note" rows={5} maxLength={2400} required aria-invalid={!!errors.note} aria-describedby={errors.note?'note-error':'note-help'} placeholder={t(lang,'المنيو، المساحة، المرحلة الحالية، والموعد المستهدف إن وجد','Menu, space, current stage, and target timing if known')}/><span className="form-note" id="note-help">{t(lang,'حتى ٢٤٠٠ حرف. للمشاريع الخاصة يكفي وصف عام.','Up to 2,400 characters. A general description is enough for private projects.')}</span>{fieldError('note')}</div>
  </div>
  <div className="honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off"/></div>
  <p className="form-note">{t(lang,'ستُستخدم معلوماتك للرد على استفسارك.','Your information will be used to respond to your enquiry.')} <a href={href(lang,'privacy')}>{t(lang,'الخصوصية','Privacy')}</a></p>
  {state==='error'&&<p className="form-error" role="alert">{error}</p>}
  <Button type="submit" disabled={state==='sending'} className="button submit-button">{state==='sending'?t(lang,'جارٍ إرسال تفاصيل المشروع…','Sending your project details…'):t(lang,'أرسل تفاصيل المشروع','Send Project Details')}</Button>
  <p className="form-note" role="status" aria-live="polite">{state==='sending'?t(lang,'يرجى الانتظار حتى تأكيد الإرسال.','Please wait for delivery confirmation.'):t(lang,'سيتم إرسال البيانات مباشرة إلى فريق نمو الأعمال.','Your details will be sent directly to the Business Growth team.')}</p>
 </form>
}
