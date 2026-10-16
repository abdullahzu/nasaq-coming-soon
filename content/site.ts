import catalogue from './catalogue.json'
export type Language = 'ar' | 'en'
export type Bilingual = { ar: string; en: string }
export const t = (lang: Language, ar: string, en: string) => lang === 'ar' ? ar : en
export const services = catalogue.services
export const concepts = catalogue.concepts
export const href = (lang: Language, path = '') => `/${lang}${path ? '/' + path.replace(/^\/+|\/+$/g, '') : ''}`
export const contactHref = (lang:Language, query='') => `${href(lang)}${query ? '?'+query.replace(/^\?/, '') : ''}#contact`
export const corePages = ['','about','approach','services','engagements','concepts','deliverables','contact','privacy']
export const allPaths = [...corePages,...services.map(s=>`services/${s.slug}`),...concepts.map(c=>`concepts/${c.slug}`)]
export const names: Record<string,Bilingual> = {
 '': {ar:'التشغيل قبل المساحة',en:'Operational Flow Before Space'},
 about:{ar:'عن نَسَق',en:'About NASAQ'}, approach:{ar:'منهج نَسَق',en:'Our Approach'},
 services:{ar:'الخدمات',en:'Services'}, concepts:{ar:'مفاهيم المشاريع',en:'Project Concepts'},
 engagements:{ar:'باقات العمل',en:'Engagement Packages'}, deliverables:{ar:'المخرجات',en:'Deliverables'},
 contact:{ar:'ناقش مشروعك',en:'Discuss Your Project'},privacy:{ar:'الخصوصية',en:'Privacy'},
}
export const groups = [
 {name:{ar:'القرارات المبكرة',en:'Early decisions'},desc:{ar:'من الفكرة إلى متطلبات واضحة قبل الالتزام.',en:'Turn an early idea into clearer requirements before commitment.'},ids:['S01','S02','S03']},
 {name:{ar:'التحديد الفني',en:'Technical definition'},desc:{ar:'معدات ومرافق وأعمال تصنيع ضمن نطاق مترابط.',en:'Connect equipment, utilities and fabrication in one coordinated scope.'},ids:['S05','S06','S07']},
 {name:{ar:'المقارنة التجارية',en:'Commercial comparison'},desc:{ar:'أساس واضح للميزانية ومقارنة عروض الموردين.',en:'A clear basis for budgets and supplier-offer comparison.'},ids:['S04','S08']},
 {name:{ar:'دعم المالك والمشاريع الخاصة',en:'Owner-side and private support'},desc:{ar:'رؤية مستقلة للقرار ومشاركة مدروسة للمعلومات.',en:'Independent decision support and considered information sharing.'},ids:['S09','S10']},
]
export const packages = [
 {name:{ar:'وضوح البداية',en:'Clarity Sprint'},stage:{ar:'للقرارات الأولى وتحديد اتجاه النقاش.',en:'For initial decisions and a clearer starting brief.'}},
 {name:{ar:'تحقق المفهوم',en:'Concept Validation'},stage:{ar:'لمناقشة ملاءمة الفكرة وطريقة التشغيل.',en:'For discussing the fit of a concept and its operating model.'}},
 {name:{ar:'حزمة التخطيط الفني',en:'Technical Planning Pack'},stage:{ar:'لتحديد احتياجات التخطيط والتنسيق الفني.',en:'For defining planning and technical coordination needs.'}},
 {name:{ar:'حزمة العطاء والقرار',en:'Tender & Decision Pack'},stage:{ar:'لمناقشة النطاق وأساس المقارنة قبل الاختيار.',en:'For discussing scope and comparison before selection.'}},
 {name:{ar:'مستشار المالك',en:'Owner-Side Advisory'},stage:{ar:'لدعم المالك خلال مراحل القرار المتفق عليها.',en:'For owner support through agreed decision stages.'}},
]
export const flow: Bilingual[] = [
 {ar:'المنيو',en:'Menu'},{ar:'نموذج التشغيل',en:'Operating model'},{ar:'تدفق العمل',en:'Workflow'},{ar:'المساحة',en:'Space'},
 {ar:'المعدات',en:'Equipment'},{ar:'الخدمات الهندسية',en:'Engineering'},{ar:'التكلفة',en:'Cost'},{ar:'النطاق',en:'Scope'},
]
export const projectTypes=[
 {id:'restaurant',ar:'مطعم أو مقهى جديد',en:'New restaurant or café'},
 {id:'renovation',ar:'فرع قائم أو مشروع تجديد',en:'Existing branch or renovation'},
 {id:'central',ar:'مطبخ مركزي أو منشأة إنتاج',en:'Central kitchen or production facility'},
 {id:'hospitality',ar:'مشروع فندقي أو ضيافة',en:'Hotel or hospitality project'},
 {id:'private',ar:'مطبخ خدمة لفيلا أو قصر',en:'Villa or palace service kitchen'},
 {id:'review',ar:'مراجعة عروض الموردين أو التكلفة الرأسمالية',en:'Supplier-offer or CAPEX review'},
 {id:'other',ar:'أخرى',en:'Other'},
]
export const stages=[
 {id:'idea',ar:'فكرة أولية',en:'Early idea'},{id:'space',ar:'مساحة متاحة',en:'Available space'},
 {id:'planning',ar:'مرحلة التخطيط',en:'Planning'},{id:'offers',ar:'مقارنة عروض',en:'Comparing offers'},
 {id:'other',ar:'مرحلة أخرى',en:'Other stage'},
]
export function pageName(path:string):Bilingual {return names[path]??services.find(s=>path===`services/${s.slug}`)?.name??concepts.find(c=>path===`concepts/${c.slug}`)?.name??{ar:'الصفحة غير موجودة',en:'Page not found'}}
