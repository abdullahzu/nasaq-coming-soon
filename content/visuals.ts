import type {Bilingual} from './site'
type Visual = Bilingual & {src:string; set?:string}
const pageVisual=(file:string,ar:string,en:string):Visual=>({src:`/images/pages/${file}-1536.webp`,set:`/images/pages/${file}-768.webp 768w, /images/pages/${file}-1536.webp 1536w`,ar,en})
// Each logical page owns its photograph. Arabic and English counterparts share it.
export const visuals:Record<string,Visual> = {
 hero:{src:'/nasaq-full-counter-hero-v2.webp',ar:'كاونتر تجهيز احترافي كامل مع مخطط وعربة خدمة.',en:'A complete professional preparation counter with a plan and service trolley.'},
 villa:{src:'/nasaq-villa-service-trolley-layout.webp',ar:'عربة خدمة في مطبخ خاص ضمن مسار واضح للحركة.',en:'A service trolley in a private kitchen with a clear circulation route.'},
 coffee:{src:'/images/coffee-1536.webp',set:'/images/coffee-768.webp 768w, /images/coffee-1536.webp 1536w',ar:'كاونتر قهوة ومخبز مع مناطق للتحضير والعرض واستلام الطلبات.',en:'A coffee and bakery counter with preparation, display and order-collection areas.'},
 homeConcepts:pageVisual('home-concepts-simple-v2','كاونتر استانلس بسيط عليه وعاء أغذية صحية وبرجر وكرواسون، بخلفية بيضاء ولمسة خضراء بترولية.','A simple stainless counter with a healthy bowl, burger and croissant, against a white backdrop with a deep-teal accent.'),
 "S01":pageVisual("service-s01","مساحة مقهى مضيئة قبل التجهيز، بواجهات زجاجية واسعة وعينات تشطيبات كاملة الحجم.","A bright caf\u00e9 space before fit-out, with wide glazing and full-size finish samples."),
 "S02":pageVisual("service-s02","تصور لمقهى ومخبز مدمج، يوضح علاقة كاونتر الخدمة بمساحة التشغيل.","A compact caf\u00e9 and bakery concept showing the relationship between the service counter and operating space."),
 "S03":pageVisual("service-s03","منظر علوي لجزيرة تحضير بمكونات طازجة ومساحات عمل واضحة لقائمة الطعام.","An overhead view of a preparation island with fresh ingredients and clearly arranged menu workspaces."),
 "S04":pageVisual("service-s04","معدات مطبخ احترافية معروضة بشكل مستقل لدراسة الخيارات ومقارنتها.","Professional kitchen equipment presented separately for considering and comparing options."),
 "S05":pageVisual("service-s05","توزيع معدات احترافية حول جزيرة تحضير، يتضمن تبريداً وفرناً وخلاطاً كبيراً.","Professional equipment arranged around a preparation island, including refrigeration, an oven and a large mixer."),
 "S06":pageVisual("service-s06","جدار تجهيز مطبخ مع مظلة شفط استانلس ومرافق مدمجة ضمن التكوين المعماري.","A kitchen equipment wall with a stainless extraction canopy and services integrated into the architecture."),
 "S07":pageVisual("service-s07","تفاصيل تصنيع كاونتر خدمة استانلس كامل، مع خزائن ورفوف وخلفية بلون أخضر بترولي.","A fully fabricated stainless service counter with cabinets, shelves and a deep teal backdrop."),
 "S08":pageVisual("service-s08","خامات استانلس وسيراميك وملفات مواصفات مغلقة تدعم تصور نطاق التجهيز.","Stainless and ceramic materials with closed specification folders expressing the fit-out scope."),
 "S09":pageVisual("service-s09","مطبخ ضيافة خاص مضيء خلف أبواب زجاجية مصنفرة بتفاصيل هادئة.","A bright private hospitality pantry behind frosted glass doors with calm architectural details."),
 "S10":pageVisual("service-s10","مطبخ عرض متكامل يفتح على منطقة الطعام، مع جزيرة تشغيل رئيسية.","A complete show kitchen opening toward a dining area around a central working island."),
 "C01":pageVisual("concept-c01","بار قهوة مختصة بكاونتر أبيض منحوت، ماكينة قهوة خضراء بترولية وعرض مخبوزات.","A specialty coffee bar with a sculpted white counter, teal espresso machine and bakery display."),
 "C02":pageVisual("concept-c02","كاونتر مطعم برجر ودجاج سريع مع منطقة شوي وقلي وتجهيز طلبات.","A burger and fried-chicken service counter with grilling, frying and order preparation areas."),
 "C03":pageVisual("concept-c03","مفهوم شاورما مع شوايات رأسية وكاونتر تحضير وواجهة خدمة حجرية.","A shawarma concept with vertical rotisseries, a preparation counter and stone service frontage."),
 "C04":pageVisual("concept-c04","كاونتر أغذية صحية بأطباق وخضروات ملونة ضمن مساحة تحضير مضيئة.","A healthy-food counter with colourful bowls and vegetables in a bright preparation space."),
 "C05":pageVisual("concept-c05","مطبخ سحابي بمناطق إنتاج مستقلة ومساحة منظمة لتعبئة الطلبات.","A cloud kitchen with separate production bays and an organised order-packing area."),
 "C06":pageVisual("concept-c06","مطعم عالمي غير رسمي بأقواس مضيئة ومطبخ مفتوح ضمن المشهد.","An international casual-dining restaurant with sunlit arches and an open kitchen."),
 "C07":pageVisual("concept-c07","مساحة فطور وبرنش بضوء النهار، وطاولة تضم أطباق فطور وقهوة.","A daylit breakfast and brunch space with breakfast dishes and coffee on a communal table."),
 "C08":pageVisual("concept-c08","مخبز وحلويات بواجهة عرض زجاجية منحنية وتفاصيل حجرية مشرقة.","A bakery and patisserie with a curved glass display and bright stone finishes."),
 "C09":pageVisual("concept-c09","مطبخ مركزي واسع بجزر تحضير وأفران إنتاج ومسارات حركة منظمة.","A spacious central kitchen with preparation islands, production ovens and organised circulation."),
 "C10":pageVisual("concept-c10","قاعة طعام متعددة المفاهيم بأكشاك مستقلة وجلسات مشتركة تحت إضاءة علوية.","A multi-concept food hall with individual kiosks and communal seating beneath a skylight."),
 "C11":pageVisual("concept-c11","مطبخ خدمة لفيلا أو قصر بجزيرة استانلس ومسار ضيافة إلى غرفة الطعام.","A villa or palace service kitchen with a stainless island and a hospitality route to the dining room."),
 "about":pageVisual("core-about","استوديو تصميم مرافق أغذية ومشروبات مضيء مع مكتبة خامات وجزيرة عمل.","A bright foodservice design studio with a material library and working island."),
 "approach":pageVisual("core-approach","منظور مرتفع لمطبخ احترافي يوضح علاقات التحضير والطهي والخدمة والحركة.","An elevated view of a professional kitchen showing preparation, cooking, service and circulation relationships."),
 "services":pageVisual("core-services","معرض تصميم وتجهيز ضيافة يجمع الاستانلس والحجر داخل إطار معماري أخضر بترولي.","A hospitality design and equipment gallery combining stainless steel and stone within a teal architectural frame."),
 "concepts":pageVisual("core-concepts","قهوة وطبق صحي وحلوى على كاونتر مضيء تعبر عن تنوع مفاهيم الضيافة.","Coffee, a healthy bowl and a dessert on a bright counter expressing different hospitality concepts."),
 "engagements":pageVisual("core-engagements","غرفة نقاش مشاريع مضيئة بطاولة منحنية وخامات وملفات عمل مغلقة.","A bright project discussion room with a curved table, material samples and closed work folders."),
 "deliverables":pageVisual("core-deliverables","تكوين تحريري لملفات عرض بيضاء بحواف خضراء بترولية وعينة استانلس.","An editorial arrangement of white presentation folios with teal edges and a stainless-steel sample."),
 "contact":pageVisual("core-contact","استقبال استوديو استشاري مضيء بسطح حجري أبيض وزجاج أخضر بترولي.","A bright advisory studio reception with a white stone counter and teal glass."),
 "privacy":pageVisual("core-privacy","تكوين معماري من طبقات زجاج مصنفر وأخضر بترولي يمر بينها ضوء الصباح.","An architectural composition of frosted and teal glass layers catching morning light."),
}
export const serviceVisuals:Record<string,string> = {"S01": "S01", "S02": "S02", "S03": "S03", "S04": "S04", "S05": "S05", "S06": "S06", "S07": "S07", "S08": "S08", "S09": "S09", "S10": "S10"}
export const conceptVisuals:Record<string,string> = {"C01": "C01", "C02": "C02", "C03": "C03", "C04": "C04", "C05": "C05", "C06": "C06", "C07": "C07", "C08": "C08", "C09": "C09", "C10": "C10", "C11": "C11"}
export const coreVisuals:Record<string,string> = {"about": "about", "approach": "approach", "services": "services", "concepts": "concepts", "engagements": "engagements", "deliverables": "deliverables", "contact": "contact", "privacy": "privacy"}
