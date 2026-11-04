import {services, concepts, t, type Language} from '@/content/site'
import {serviceDetails} from '@/content/service-details'
import conceptDetails from '@/content/concept-details.json'
import {PageHero, Related, TextLink} from './common'
import {serviceVisuals, conceptVisuals} from '@/content/visuals'
import {DetailExplorer, EditorialList, InputNote, ScopeBand} from './detail-explorer'
import FAQ from './faq'

function RelatedSection({lang, ids, all}: {lang: Language; ids: string[]; all: 'services' | 'concepts'}) {
  return <section className="related-section wrap"><div>
    <span className="eyebrow">{t(lang, 'الخطوة التالية', 'The next connection')}</span>
    <h2>{t(lang, 'خدمات مرتبطة', 'Related services')}</h2>
    <p>{t(lang, 'يحدد نطاق المشروع الخدمات المناسبة.', 'The project scope determines which services apply.')}</p>
    <TextLink lang={lang} path={all}>{all === 'services' ? t(lang, 'جميع الخدمات', 'All services') : t(lang, 'جميع مفاهيم المشاريع', 'All project concepts')}</TextLink>
  </div><Related lang={lang} ids={ids}/></section>
}

export function ServicePage({lang, id}: {lang: Language; id: string}) {
  const service = services.find(s => s.id === id)!, d = serviceDetails[id]
  const label = t(lang, 'ناقش هذه الخدمة', 'Discuss this service')
  return <>
    <PageHero lang={lang} kicker={t(lang, 'الخدمات الاستشارية', 'Advisory services')}
      title={service.name[lang]} translation={lang === 'ar' ? service.name.en : undefined}
      lead={d.intro[lang]} visual={serviceVisuals[id]} cta ctaLabel={label}
      query={'service=' + id} jump={{href:'#service-content', label:t(lang, 'استكشف المخرجات', 'Explore the outputs')}}/>
    <DetailExplorer lang={lang} id="service-content" initial="outputs"
      aside={<InputNote lang={lang} items={d.inputs}/>}
      tabs={[
        {id:'when', label:t(lang, 'متى تحتاجها', 'When it helps'), content:<><span className="eyebrow">{t(lang, 'هل هذه نقطة البداية المناسبة؟', 'Is this the right starting point?')}</span><h2>{t(lang, 'متى تساعدك هذه الخدمة؟', 'When this helps')}</h2><EditorialList lang={lang} items={d.when}/></>},
        {id:'outputs', label:t(lang, 'المخرجات', 'Outputs'), content:<><h2>{t(lang, 'ما الذي نوضحه؟', 'What we clarify')}</h2><EditorialList lang={lang} items={service.outputs}/><p className="detail-panel-note">{t(lang, 'تُحدد المخرجات ودرجة تفصيلها في نطاق العمل المتفق عليه.', 'Deliverables and their level of detail are defined in the agreed scope of work.')}</p></>},
        {id:'inputs', label:t(lang, 'المدخلات', 'Inputs'), content:<><span className="eyebrow">{t(lang, 'من مشروعك إلى نطاق واضح', 'From your project to a clear scope')}</span><h2>{t(lang, 'ما المعلومات المفيدة؟', 'What is useful to share?')}</h2><EditorialList lang={lang} items={d.inputs} variant="inputs"/><p className="detail-panel-note">{t(lang, 'البداية الجيدة لا تحتاج إلى اكتمال جميع المعلومات.', 'You do not need every detail in place to start the conversation.')}</p></>},
        {id:'steps', label:t(lang, 'خطوات العمل', 'How we work'), content:<><span className="eyebrow">{t(lang, 'منهج مترابط', 'A connected approach')}</span><h2>{t(lang, 'كيف نتقدم في العمل؟', 'How the work proceeds')}</h2><ol className="editorial-steps">{d.steps.map((step, i) => <li key={i}><span className="step-order" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span><p>{step[lang]}</p></li>)}</ol></>},
        {id:'faq', label:t(lang, 'أسئلة شائعة', 'Common questions'), content:<><span className="eyebrow">{t(lang, 'قبل بدء العمل', 'Before we begin')}</span><h2>{t(lang, 'أسئلة شائعة', 'Common questions')}</h2><FAQ lang={lang} items={d.faq}/></>},
      ]}/>
    <ScopeBand lang={lang}><p>{d.scope[lang]}</p></ScopeBand>
    <RelatedSection lang={lang} ids={d.related} all="services"/>
  </>
}

export function ConceptPage({lang, id}: {lang: Language; id: string}) {
  const concept = concepts.find(c => c.id === id)!, d = conceptDetails[id as keyof typeof conceptDetails]
  const query = 'concept=' + id + (id === 'C11' ? '&type=private' : '')
  const label = t(lang, 'ناقش هذا المفهوم', 'Discuss this concept')
  return <>
    <PageHero lang={lang} kicker={t(lang, 'مفاهيم المشاريع', 'Project concepts')}
      title={concept.name[lang]} translation={lang === 'ar' ? concept.name.en : undefined}
      lead={d.intro[lang]} visual={conceptVisuals[id]} cta ctaLabel={label} query={query}
      jump={{href:'#concept-content', label:t(lang, 'اكتشف نطاق التخطيط', 'Explore the planning scope')}}/>
    <DetailExplorer lang={lang} id="concept-content" initial="scope"
      aside={<InputNote lang={lang} items={d.inputs}/>}
      tabs={[
        {id:'scope', label:t(lang, 'نطاق التخطيط', 'Planning scope'), content:<><span className="eyebrow">{t(lang, 'تجربة ضيافة، ومنظومة تشغيل', 'Hospitality meets operations')}</span><h2>{t(lang, 'نربط الخدمة بالتشغيل.', 'Connect service with operations.')}</h2><EditorialList lang={lang} items={d.scope}/></>},
        {id:'flow', label:t(lang, 'تسلسل التشغيل', 'Operating sequence'), content:<><span className="eyebrow">{t(lang, 'العلاقات قبل التفاصيل', 'Relationships before details')}</span><h2>{t(lang, 'لكل خطوة، علاقة بما يليها.', 'Every step connects to the next.')}</h2><ol className="concept-sequence">{d.sequence.map((step, i) => <li key={i}><span className="step-order" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span><span>{step[lang]}</span></li>)}</ol><p className="detail-panel-note">{t(lang, 'تُراجع العلاقات والمسارات وفق المنيو والموقع ومتطلبات المشروع.', 'Relationships and routes are reviewed against the menu, site and project requirements.')}</p></>},
        {id:'questions', label:t(lang, 'أسئلة القرار', 'Decision questions'), content:<><span className="eyebrow">{t(lang, 'قبل تثبيت المساحة والمعدات', 'Before fixing space and equipment')}</span><h2>{t(lang, 'أسئلة تحدد اتجاه التخطيط', 'Questions that shape the plan')}</h2><EditorialList lang={lang} items={d.questions} variant="questions"/></>},
        {id:'starting', label:t(lang, 'نقطة البداية', 'The starting point'), content:<><span className="eyebrow">{t(lang, 'مدخلات واضحة', 'Clear inputs')}</span><h2>{t(lang, 'نبدأ بما يتوفر لديك.', 'Start with what you have.')}</h2><EditorialList lang={lang} items={d.inputs} variant="inputs"/><p className="detail-panel-note">{t(lang, 'نبدأ بالمدخلات المتاحة ونوضح الافتراضات. نراجع الوظائف المطلوبة وعلاقات محطات العمل، ثم نربطها بالمعدات والمرافق وحدود النطاق.', 'We start with the available inputs and make assumptions explicit. Required functions and workstation relationships are reviewed, then connected to equipment, utilities and scope boundaries.')}</p>{id === 'C11' && <p className="detail-panel-note">{t(lang, 'للمشاريع الخاصة، يكفي وصف عام في الرسالة الأولى. نتفق لاحقاً على المعلومات الضرورية وطريقة مشاركتها، مع فصل تشغيل الضيافة عن الاستخدام العائلي.', 'For private projects, a general description is enough for the first message. Necessary information and its sharing method are agreed later, with hospitality service considered separately from family use.')}</p>}</>},
      ]}/>
    <ScopeBand lang={lang}><p>{t(lang, 'تُحدد المخرجات وجولات المراجعة ومسؤوليات التنسيق قبل بدء العمل. يتطور التخطيط وفق المنيو والسعة وطريقة الخدمة وبيانات الموقع.', 'Deliverables, review rounds and coordination responsibilities are defined before work begins. Planning develops around the menu, capacity, service model and site information.')}</p></ScopeBand>
    <RelatedSection lang={lang} ids={d.related} all="concepts"/>
  </>
}
