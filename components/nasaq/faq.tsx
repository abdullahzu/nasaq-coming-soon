'use client'
import {Accordion,AccordionItem,AccordionTrigger,AccordionContent} from '@/components/ui/accordion'
import type {Language,Bilingual} from '@/content/site'
export default function FAQ({lang,items}:{lang:Language;items:{q:Bilingual;a:Bilingual}[]}){return <Accordion type="multiple" className="faq">{items.map((x,i)=><AccordionItem key={i} value={String(i)}><AccordionTrigger>{x.q[lang]}</AccordionTrigger><AccordionContent>{x.a[lang]}</AccordionContent></AccordionItem>)}</Accordion>}
