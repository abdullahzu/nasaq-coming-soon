import {t,type Language} from '@/content/site'
import ContactForm from './contact-form'
import {TextLink} from './common'

export default function ContactSection({lang}:{lang:Language}){
 return <section className="contact-section section" id="contact" aria-labelledby="enquiry-title">
  <div className="wrap contact-layout">
   <div className="contact-intro">
    <span className="eyebrow">{t(lang,'ابدأ مبكراً','Start early')}</span>
    <h2 id="enquiry-title">{t(lang,'كلما بدأنا أبكر، كان القرار أوضح.','The earlier we begin, the clearer the decision.')}</h2>
    <p>{t(lang,'شاركنا نبذة مختصرة عن مشروعك والقرار الذي تحتاج إلى توضيحه. البداية الجيدة لا تحتاج إلى اكتمال جميع المعلومات.','Share a short project brief and the decision you need to clarify. You do not need every detail in place to start the conversation.')}</p>
    <div className="contact-details">
     <span className="eyebrow">{t(lang,'فريق نمو الأعمال','Business Growth Team')}</span>
     <a href="mailto:growth@nasaqfb.com" dir="ltr">growth@nasaqfb.com</a>
     <p>{t(lang,'الفكرة، ونوع المشروع، والمساحة إن كانت معروفة، والمرحلة الحالية. شارك ما لديك، وسنحدد معك الخطوة التالية.','Your concept, project type, space if known, and current stage. Share what you have and we can identify the next step.')}</p>
     <TextLink lang={lang} path="privacy">{t(lang,'كيف نستخدم معلوماتك؟','How is your information used?')}</TextLink>
    </div>
   </div>
   <div className="contact-form-panel"><ContactForm lang={lang}/></div>
  </div>
 </section>
}
