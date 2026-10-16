import type {Bilingual} from './site'

type Visual = Bilingual & {src:string; set?:string}
export const visuals:Record<string,Visual> = {
 hero:{src:'/nasaq-full-counter-hero-v2.webp',ar:'كاونتر تجهيز احترافي كامل مع مخطط وعربة خدمة.',en:'A complete professional preparation counter with a plan and service trolley.'},
 villa:{src:'/nasaq-villa-service-trolley-layout.webp',ar:'عربة خدمة في مطبخ خاص ضمن مسار واضح للحركة.',en:'A service trolley in a private kitchen with a clear circulation route.'},
 coffee:{src:'/images/coffee-1536.webp',set:'/images/coffee-768.webp 768w, /images/coffee-1536.webp 1536w',ar:'كاونتر قهوة ومخبز مع مناطق للتحضير والعرض واستلام الطلبات.',en:'A coffee and bakery counter with preparation, display and order-collection areas.'},
 central:{src:'/images/central-1536.webp',set:'/images/central-768.webp 768w, /images/central-1536.webp 1536w',ar:'مناطق تحضير وإنتاج وتعبئة في تصوّر لمطبخ مركزي.',en:'Preparation, production and packing areas in a conceptual central kitchen.'},
 advisory:{src:'/images/advisory-1536.webp',set:'/images/advisory-768.webp 768w, /images/advisory-1536.webp 1536w',ar:'طاولة تخطيط عليها مخططات معمارية ومجسّم مصغّر لكاونتر تجهيز كامل ودفتر بلون نَسَق.',en:'A planning desk with architectural plans, a scale model of a complete preparation counter and a teal notebook.'},
 coordination:{src:'/images/coordination-1536.webp',set:'/images/coordination-768.webp 768w, /images/coordination-1536.webp 1536w',ar:'خط مطبخ متكامل يجمع مناطق التحضير والطهي والمعدات والتهوية ضمن كاونتر استانلس متصل.',en:'A complete kitchen line bringing preparation, cooking, equipment and ventilation together along a stainless-steel counter.'},
 materials:{src:'/images/materials-1536.webp',set:'/images/materials-768.webp 768w, /images/materials-1536.webp 1536w',ar:'كاونتر استانلس كامل بسطح تحضير ورف سفلي وخزانة، مع عينات خامات توضح التشطيبات.',en:'A complete stainless-steel counter with a preparation surface, lower shelf and cabinet, beside material finish samples.'},
}
export const serviceVisuals:Record<string,string> = {
 S01:'advisory',S02:'advisory',S03:'coffee',S04:'materials',S05:'hero',
 S06:'coordination',S07:'materials',S08:'advisory',S09:'villa',S10:'coordination',
}
export const conceptVisuals:Record<string,string> = {
 C01:'coffee',C02:'coordination',C03:'coordination',C04:'central',C05:'central',
 C06:'coordination',C07:'coffee',C08:'coffee',C09:'central',C10:'coordination',C11:'villa',
}

export const coreVisuals:Record<string,string> = {services:'coordination',concepts:'coffee',about:'advisory',approach:'advisory',engagements:'advisory',deliverables:'advisory',contact:'advisory',privacy:'advisory'}
