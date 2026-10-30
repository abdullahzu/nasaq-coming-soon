import {t,href,contactHref,groups,services,concepts,packages,type Language} from '@/content/site'
import {Arrow,SectionHead,Flow,TextLink,Photo} from './common'
import ContactSection from './contact-section'
import ServiceWindows from './service-windows'
export default function Home({lang}:{lang:Language}){
 const moreConcepts=[
  ['C02','البرجر والدجاج','Burgers & chicken'],
  ['C03','الشاورما','Shawarma'],
  ['C04','الأغذية الصحية','Healthy food'],
  ['C05','المطابخ السحابية','Cloud kitchens'],
  ['C06','المطاعم العالمية','Casual dining'],
  ['C07','الفطور والبرنش','Breakfast & brunch'],
  ['C08','المخابز والحلويات','Bakery & patisserie'],
  ['C09','المطابخ المركزية','Central kitchens'],
  ['C10','قاعات الطعام','Food halls'],
 ]
 const situations=[
  {ar:'فكرة قبل الالتزام',en:'An idea before commitment',a:'افهم النطاق والأولويات قبل الخطوة التالية.',e:'Clarify scope and priorities before the next step.',p:'services/pre-contract-clarity'},
  {ar:'قائمة طعام ومساحة',en:'A menu and a space',a:'اختبر العلاقة بين التشغيل والسعة والمساحة.',e:'Explore the fit between operations, capacity and space.',p:'services/menu-space-validation'},
  {ar:'معدات وعروض موردين',en:'Equipment and supplier offers',a:'قارن النطاق والمواصفات على أساس واضح.',e:'Compare scope and specifications on a clear basis.',p:'services/supplier-offer-comparison'},
  {ar:'مشروع خاص',en:'A private project',a:'خطّط للخدمة والضيافة بخصوصية.',e:'Plan service and hospitality with discretion.',p:'concepts/villas-palaces-service-kitchen'},
 ]
 return <>
 <section className="hero architectural-hero wrap"><div className="architectural-hero-copy"><span className="eyebrow">{t(lang,'تصميم واستشارات مرافق الأغذية والمشروبات','Foodservice Design & Advisory')}</span><h1>{t(lang,'التشغيل قبل المساحة','Operational Flow Before Space')}</h1><p className="positioning">{t(lang,'نخطّط لمنظومة الحركة والتشغيل، ثم نصمّم المساحة حولها.','We plan the operational flow, then design the space around it.')}</p><a className="text-link hero-explore" href="#service-windows">{t(lang,'استكشف ما يحتاجه مشروعك','Explore what your project needs')}<Arrow/></a></div></section>
 <ServiceWindows lang={lang}/>

 <section className="section tinted" id="start"><div className="wrap"><SectionHead lang={lang} eyebrow={t(lang,'ابدأ من احتياجك','Start with your need')} title={t(lang,'ما القرار الذي تريد توضيحه؟','Which decision needs clarity?')}/><div className="decision-grid">{situations.map(s=><a className="decision-link" key={s.p} href={href(lang,s.p)}><div><h3>{s[lang]}</h3><p>{lang==='ar'?s.a:s.e}</p></div><Arrow/></a>)}</div></div></section>
 <section className="section" id="approach"><div className="wrap"><div className="approach-intro"><div><span className="eyebrow">{t(lang,'منهج نَسَق','The NASAQ approach')}</span><h2>{t(lang,'وضوح يمكن البناء عليه.','Clarity you can build on.')}</h2></div><div><p>{t(lang,'نحوّل المنيو وطريقة التشغيل إلى تدفق واضح، تخطيط مدروس، متطلبات هندسية دقيقة، ونطاق يمكن تنفيذه وتسعيره.','We turn the menu and operating model into clear flow, considered planning, coordinated engineering requirements, and an actionable scope.')}</p><TextLink lang={lang} path="approach">{t(lang,'اكتشف المنهج','Explore our approach')}</TextLink></div></div><div className="approach-counter"><Photo lang={lang} kind="hero"/><div><span className="eyebrow">{t(lang,'منظومة تشغيل متكاملة','A complete operating system')}</span><h3>{t(lang,'كل قرار يبدأ من طريقة العمل.','Every decision starts with the operation.')}</h3><p>{t(lang,'نربط الحركة والمساحة والمعدات ومتطلبات المرافق ضمن نطاق واضح.','Connect movement, space, equipment and utility requirements within a clear scope.')}</p></div></div><Flow lang={lang}/></div></section>
 <section className="section tinted" id="services"><div className="wrap"><SectionHead lang={lang} eyebrow={t(lang,'مجالات العمل','Our services')} title={t(lang,'قرار واحد يشمل الصورة كاملة.','See the complete picture.')} body={t(lang,'نبدأ من احتياج المشروع الحقيقي، ثم نحدد ما يلزم من دراسة وتخطيط ومراجعة.','We start with the project’s real needs, then define the study, planning and review it requires.')} path="services" label={t(lang,'جميع الخدمات','All services')}/><div className="service-groups">{groups.map(g=><article className="service-group" key={g.name.en}><h3>{g.name[lang]}</h3><p>{g.desc[lang]}</p><ul className="service-list">{g.ids.map(id=>services.find(s=>s.id===id)!).map(s=><li key={s.id}><a href={href(lang,'services/'+s.slug)}>{s.name[lang]}<Arrow/></a></li>)}</ul></article>)}</div></div></section>
 <section className="section" id="private"><div className="wrap"><SectionHead lang={lang} eyebrow={t(lang,'مفاهيم المشاريع','Project concepts')} title={t(lang,'لكل مفهوم، منطقه التشغيلي.','Every concept has its own operating logic.')} path="concepts" label={t(lang,'استكشف المفاهيم','Explore the concepts')}/><div className="concept-feature"><article className="photo-link"><a href={href(lang,'concepts/specialty-coffee-bakery')}><Photo lang={lang} kind="coffee"/><h3>{concepts[0].name[lang]}</h3></a><p>{t(lang,'نربط رحلة الطلب والاستلام بمناطق التحضير والعرض والخدمة.','Connect ordering and collection with preparation, display and service.')}</p><TextLink lang={lang} path="concepts/specialty-coffee-bakery">{t(lang,'اكتشف نطاق التخطيط','Explore the planning scope')}</TextLink></article><article className="photo-link"><a href={href(lang,'concepts/villas-palaces-service-kitchen')}><Photo lang={lang} kind="villa"/><h3>{concepts[10].name[lang]}</h3></a><p>{t(lang,'خدمة مدروسة للضيافة والعزائم، منفصلة عن الاستخدام العائلي اليومي.','Considered service for hospitality and gatherings, separate from everyday family use.')}</p><TextLink lang={lang} path="concepts/villas-palaces-service-kitchen">{t(lang,'اكتشف المشاريع الخاصة','Explore private projects')}</TextLink></article></div><article className="concept-overview">
  <a className="concept-overview-image" href={href(lang,'concepts')}><Photo lang={lang} kind="homeConcepts"/></a>
  <div className="concept-overview-copy"><h3>{t(lang,'مفاهيم أخرى تستحق الاستكشاف.','Explore more project concepts.')}</h3>
   <p>{t(lang,'من مطعمك الأول إلى منظومة إنتاج متكاملة، اكتشف نطاق التخطيط الذي يناسب فكرتك.','From your first restaurant to a complete production operation, explore the planning scope for your concept.')}</p>
   <ul className="concept-overview-links">{moreConcepts.map(([id,ar,en])=>{const concept=concepts.find(c=>c.id===id)!;return <li key={id}><a href={href(lang,'concepts/'+concept.slug)}>{t(lang,ar,en)}</a></li>})}</ul>
  </div>
 </article></div></section>
 <section className="section tinted"><div className="wrap"><SectionHead lang={lang} eyebrow={t(lang,'المخرجات','Deliverables')} title={t(lang,'من الفكرة إلى نطاق واضح.','From early idea to clear scope.')} body={t(lang,'جداول ورسومات ومقارنات تدعم القرار. تتحدد المخرجات بحسب نطاق العمل المتفق عليه.','Schedules, drawings and comparisons that support decisions. Deliverables depend on the agreed engagement scope.')} path="deliverables" label={t(lang,'استعرض المخرجات','Explore the deliverables')}/><div className="deliverable-summaries">{[
['متطلبات واضحة','Clear requirements','نربط احتياجات التشغيل بالمعدات والمرافق ونطاق التصنيع.','Connect operating needs with equipment, utilities and fabrication scope.'],
['قرارات قابلة للمراجعة','Reviewable decisions','نوضح الافتراضات والأولويات والمعلومات التي تحتاج إلى تأكيد.','Make assumptions, priorities and information to confirm explicit.'],
['نطاق جاهز للنقاش','A scope ready to discuss','نجمع تفاصيل النطاق لتسهيل التنسيق والمقارنة والتسعير.','Bring scope details together for coordination, comparison and pricing.']
].map(([a,e,pa,pe])=><article key={e}><h3>{t(lang,a,e)}</h3><p>{t(lang,pa,pe)}</p></article>)}</div></div></section>
 <section className="section"><div className="wrap"><SectionHead lang={lang} eyebrow={t(lang,'باقات العمل','Engagement packages')} title={t(lang,'ابدأ من المرحلة التي أنت فيها.','Start where your project is.')} body={t(lang,'خمس باقات لتنظيم النقاش حول الاحتياج. نتفق معك على المخرجات والمسؤوليات والتوقيت قبل بدء العمل.','Five engagement routes to frame the conversation. We agree the deliverables, responsibilities and programme before work begins.')} path="engagements" label={t(lang,'تعرّف على الباقات','Explore engagement packages')}/><ul className="packages">{packages.map(p=><li key={p.name.en}><h3>{p.name[lang]}</h3><p>{p.stage[lang]}</p></li>)}</ul></div></section>
 <ContactSection lang={lang}/>
 </>
}
