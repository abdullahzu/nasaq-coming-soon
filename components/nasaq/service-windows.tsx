'use client'

import {useRef, useState, type KeyboardEvent} from 'react'
import {services, t, href, contactHref, type Language} from '@/content/site'
import {Arrow} from './common'

const windows = [
  {id:'S05', image:'equipment', ar:'نربط قائمة المعدات بسعة التشغيل وطبيعة العمل والحركة في المساحة.', en:'Connect the equipment list with capacity, daily operations and movement through the space.', altAr:'فريق يعمل في مطبخ احترافي منظم بمناطق تجهيز واضحة.', altEn:'A team working in a professional kitchen with clearly arranged preparation areas.'},
  {id:'S03', image:'menu', ar:'نختبر العلاقة بين قائمة الطعام والتحضير والخدمة والمساحة المتاحة.', en:'Explore how the menu, preparation and service fit the available space.', altAr:'مراجعة مخطط ومساحات عمل لمرفق أغذية ومشروبات.', altEn:'Reviewing a layout and work areas for a foodservice facility.'},
  {id:'S06', image:'mep', ar:'نوضح احتياجات المعدات من الكهرباء والمياه والصرف والتهوية للتنسيق المبكر.', en:'Clarify equipment requirements for power, water, drainage and ventilation for early coordination.', altAr:'معدات ومرافق مطبخ احترافي ضمن مساحة تشغيل متكاملة.', altEn:'Equipment and utilities within a coordinated professional kitchen.'},
  {id:'S04', image:'supplier', ar:'نراجع المواصفات والاستثناءات وحدود التوريد لتصبح مقارنة العروض أوضح.', en:'Review specifications, exclusions and supply boundaries to make offers easier to compare.', altAr:'مراجعة مستندات ومواصفات لتجهيز مشروع ضيافة.', altEn:'Reviewing documents and specifications for a hospitality project.'},
] as const

export default function ServiceWindows({lang}:{lang:Language}) {
  const [selected, setSelected] = useState<string|null>('S05')
  const buttons = useRef<(HTMLButtonElement|null)[]>([])
  const panel = useRef<HTMLElement>(null)
  const current = windows.find(item=>item.id===selected) ?? windows[0]
  const service = services.find(item=>item.id===current.id)!
  const other = lang==='ar'?'en':'ar'

  function choose(id:string) {
    setSelected(value=>value===id?null:id)
  }
  function close() {
    const index = windows.findIndex(item=>item.id===selected)
    setSelected(null)
    buttons.current[index]?.focus()
  }
  function navigate(event:KeyboardEvent<HTMLButtonElement>, index:number) {
    let next = index
    if(event.key==='ArrowRight') next += lang==='ar'?-1:1
    else if(event.key==='ArrowLeft') next += lang==='ar'?1:-1
    else if(event.key==='ArrowDown') next += 2
    else if(event.key==='ArrowUp') next -= 2
    else if(event.key==='Home') next = 0
    else if(event.key==='End') next = windows.length-1
    else return
    event.preventDefault()
    buttons.current[(next+windows.length)%windows.length]?.focus()
  }

  return <section className="service-windows wrap" id="service-windows" aria-labelledby="window-title">
    <h2 id="window-title" className="sr-only">{t(lang,'استكشف خدمات نَسَق','Explore NASAQ services')}</h2>
    <div className={`window-experience${selected?'':' is-collapsed'}`}>
      <div className="window-grid" role="group" aria-label={t(lang,'اختر خدمة لعرض تفاصيلها','Choose a service to view its details')}>
        {windows.map((item,index)=>{
          const entry=services.find(s=>s.id===item.id)!
          const active=selected===item.id
          return <button type="button" key={item.id} ref={node=>{buttons.current[index]=node}}
            className={`service-window window-${item.image}`} aria-pressed={active}
            aria-expanded={active} aria-controls="window-detail" onClick={()=>choose(item.id)}
            onKeyDown={event=>navigate(event,index)}>
            <span className="window-title">{entry.name[lang]}</span>
            <span className="window-translation" lang={other} dir={other==='ar'?'rtl':'ltr'}>{entry.name[other]}</span>
            <span className="window-image"><img src={`/images/prototype3/${item.image}-tile-lg.webp`}
              srcSet={`/images/prototype3/${item.image}-tile-sm.webp 600w, /images/prototype3/${item.image}-tile-lg.webp 960w`}
              sizes="(max-width:600px) 44vw, (max-width:1000px) 43vw, 23vw"
              width="960" height="600" alt="" loading="lazy"/>
              <span className="window-arrow" aria-hidden="true">{active?'−':'+'}</span>
            </span>
          </button>
        })}
      </div>
      <article id="window-detail" className="window-detail" ref={panel} hidden={!selected} aria-labelledby="window-detail-title">
        <div className="window-detail-media"><img src={`/images/prototype3/${current.image}-md.webp`}
          srcSet={`/images/prototype3/${current.image}-sm.webp 720w, /images/prototype3/${current.image}-md.webp 1280w`}
          sizes="(max-width:600px) 90vw, (max-width:1000px) 46vw, 27vw"
          width="1280" height="800" alt={lang==='ar'?current.altAr:current.altEn} fetchPriority="high"/>
          <button type="button" className="window-close" onClick={close} aria-label={t(lang,'إغلاق تفاصيل الخدمة','Close service details')}>×</button>
        </div>
        <div className="window-detail-copy">
          <span className="eyebrow">{t(lang,'خدماتنا','Our services')}</span>
          <h3 id="window-detail-title">{service.name[lang]}</h3>
          <p className="window-translation" lang={other} dir={other==='ar'?'rtl':'ltr'}>{service.name[other]}</p>
          <p className="window-description">{current[lang]}</p>
          <h4>{t(lang,'ما الذي نوضحه؟','What we clarify')}</h4>
          <ul className="window-outputs">{service.outputs.map((output,index)=><li key={index}><span aria-hidden="true">✓</span>{output[lang]}</li>)}</ul>
          <a className="button" href={contactHref(lang,`service=${service.id}`)}>{t(lang,'ناقش هذه الخدمة','Discuss this service')}<Arrow/></a>
          <a className="window-full-link" href={href(lang,`services/${service.slug}`)}>{t(lang,'اكتشف الخدمة كاملة','Explore the full service')}</a>
        </div>
      </article>
    </div>
    <p className="sr-only" role="status" aria-live="polite">{selected?`${t(lang,'تفاصيل الخدمة: ','Service details: ')}${service.name[lang]}`:t(lang,'أُغلقت التفاصيل. اختر خدمة لعرضها.','Details closed. Choose a service to open it.')}</p>
    <div className="window-underbar"><p>{t(lang,'التخطيط والتشغيل · المعدات والمرافق · دعم القرار','Planning & operations · Equipment & utilities · Decision support')}</p><a className="text-link" href={href(lang,'services')}>{t(lang,'جميع الخدمات','All services')}<Arrow/></a></div>
  </section>
}
