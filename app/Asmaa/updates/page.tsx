import type {Metadata} from 'next'
export const metadata:Metadata={title:'المصادر والمنهج | أسماء الله الحسنى',description:'المراجع العلمية للمداخل المختصرة في أسماء الله الحسنى.',robots:{index:false,follow:false}}
const sources=[
{title:'أسماء الله الحسنى',publisher:'إسلام ويب',url:'https://www.islamweb.net/ar/article/244087',description:'مقدمة في دلالات الأسماء وأهمية معرفتها وضوابط إثباتها.'},
{title:'الفرق بين الرحمن والرحيم',publisher:'إسلام ويب',url:'https://www.islamweb.net/ar/fatwa/37954',description:'بيان المعاني المذكورة للاسمين في كتب التفسير.'},
{title:'اسم الله السلام',publisher:'إسلام ويب',url:'https://www.islamweb.net/ar/article/244411',description:'شرح الاسم وموضع وروده ودلالاته.'},
{title:'أسماء الله الحسنى كما وردت في القرآن والسنة',publisher:'إسلام ويب',url:'https://www.islamweb.net/ar/fatwa/12383',description:'توضيح الاختلاف في تعيين الأسماء وأنها ليست محصورة في عدد بعينه.'},
{title:'المختصر في معاني أسماء الله الحسنى',publisher:'طريق الإسلام · فهد بن عبد العزيز الشويرخ',url:'https://ar.demo.islamway.net/article/98746',description:'ملخصات لمعاني مجموعة من أسماء الله الحسنى.'},
{title:'الجنة لمن أحصى أسماء الله الحسنى',publisher:'طريق الإسلام',url:'https://ar.demo.islamway.net/article/92785',description:'عرض معنى الإحصاء وارتباطه بالفهم والعمل والدعاء.'},
{title:'حكم ترديد الأسماء بأعداد معينة',publisher:'إسلام ويب',url:'https://www.islamweb.net/ar/fatwa/205498',description:'فتوى حول تعيين خصائص أو أعداد للأذكار من غير دليل.'}
]
export default function Sources(){return <main dir="rtl" lang="ar" style={{maxWidth:890,minHeight:'100svh',margin:'auto',padding:'clamp(20px,5vw,50px)',boxSizing:'border-box',color:'#294a44',fontFamily:'Tahoma,Arial,sans-serif',lineHeight:1.9}}>
<nav><a href="/Asmaa" style={{color:'#426a58',textUnderlineOffset:4}}>↩ العودة إلى الأسماء</a></nav>
<p style={{fontSize:12,letterSpacing:1.5,color:'#789688',margin:'30px 0 5px'}}>ASMAA · SOURCES</p>
<h1 style={{fontSize:'clamp(29px,5vw,43px)',lineHeight:1.4,margin:'4px 0 8px'}}>المصادر والمنهج</h1>
<p style={{color:'#5b766a',fontSize:16,maxWidth:740}}>نقدّم مداخل موجزة لمعاني أسماء الله الحسنى، مع روابط لمقالات وفتاوى منشورة. صياغة الملخصات مستقلة وليست نقلاً للمقالات أو تمثيلاً رسمياً للجهات الناشرة.</p>
<section style={{display:'grid',gap:12,margin:'30px 0'}}>{sources.map(s=><article key={s.url} style={{padding:'18px 22px',border:'1px solid #dce8dd',borderRadius:16,background:'#fffefa'}}><small style={{color:'#71917e'}}>{s.publisher}</small><h2 style={{fontSize:20,margin:'4px 0'}}><a href={s.url} target="_blank" rel="noopener noreferrer" style={{color:'#376e55',textDecoration:'none'}}>{s.title} ↗</a></h2><p style={{fontSize:14,color:'#638173',margin:0}}>{s.description}</p></article>)}</section>
<section style={{padding:22,border:'1px solid #dce8dd',borderRadius:16,background:'#f0f5ef'}}><h2 style={{fontSize:20,margin:'0 0 9px'}}>كيف نقرأ الأسماء؟</h2><p style={{margin:0,fontSize:14}}>تُثبت أسماء الله تعالى من الكتاب والسنة، وليس كل تعداد مشهور محل اتفاق في التعيين والترتيب. نربط المداخل بمصادرها، ونترك المقالات والفتاوى الأصلية للقراءة في سياقها الكامل. المداخل المختصرة ليست فتوى، وقد يلزم التفصيل العلمي في بعض المسائل.</p></section>
</main>}