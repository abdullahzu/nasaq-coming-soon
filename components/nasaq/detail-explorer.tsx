'use client'

import {useRef, useState, type KeyboardEvent, type ReactNode} from 'react'
import {Check, FileText, Layers3, Settings2, Info} from 'lucide-react'
import {t, type Bilingual, type Language} from '@/content/site'

type DetailTab = {id: string; label: string; content: ReactNode}

export function DetailExplorer({lang, tabs, initial, aside, id}: {
  lang: Language; tabs: DetailTab[]; initial: string; aside: ReactNode; id: string
}) {
  const [active, setActive] = useState(initial)
  const controls = useRef<(HTMLButtonElement | null)[]>([])
  function move(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index
    if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = tabs.length - 1
    else if (event.key === 'ArrowRight') next += lang === 'ar' ? -1 : 1
    else if (event.key === 'ArrowLeft') next += lang === 'ar' ? 1 : -1
    else return
    event.preventDefault()
    next = (next + tabs.length) % tabs.length
    setActive(tabs[next].id)
    controls.current[next]?.focus()
    controls.current[next]?.scrollIntoView({block: 'nearest', inline: 'nearest'})
  }
  return <div className="detail-explorer wrap" id={id}>
    <div className="detail-tabs" role="tablist" aria-label={t(lang, 'استكشف تفاصيل الصفحة', 'Explore page details')}>
      {tabs.map((tab, i) => <button key={tab.id} type="button" role="tab"
        id={`${id}-tab-${tab.id}`} aria-controls={`${id}-panel-${tab.id}`}
        aria-selected={active === tab.id} tabIndex={active === tab.id ? 0 : -1}
        ref={node => {controls.current[i] = node}} onClick={() => setActive(tab.id)}
        onKeyDown={event => move(event, i)}>{tab.label}</button>)}
    </div>
    <div className="editorial-detail-grid">
      <div className="editorial-detail-main">
        {tabs.map(tab => <section key={tab.id} role="tabpanel" tabIndex={0}
          id={`${id}-panel-${tab.id}`} aria-labelledby={`${id}-tab-${tab.id}`}
          hidden={active !== tab.id} className="detail-tab-panel">{tab.content}</section>)}
      </div>
      {aside}
    </div>
  </div>
}

export function EditorialList({lang, items, variant = 'outputs'}: {
  lang: Language; items: Bilingual[]; variant?: 'outputs' | 'inputs' | 'questions'
}) {
  const icons = [FileText, Layers3, Settings2]
  return <ul className={`editorial-list editorial-${variant}`}>
    {items.map((item, i) => {
      const Icon = variant === 'inputs' ? icons[i % icons.length] : variant === 'questions' ? Info : Check
      return <li key={i}><span className="detail-icon" aria-hidden="true"><Icon size={22} strokeWidth={1.7}/></span><span>{item[lang]}</span></li>
    })}
  </ul>
}

export function InputNote({lang, items}: {lang: Language; items: Bilingual[]}) {
  return <aside className="editorial-input-note">
    <h2>{t(lang, 'ما نحتاجه للبدء', 'What we need to begin')}</h2>
    <p>{t(lang, 'شارك المتاح الآن. نحدد معك ما يلزم لاستكمال الدراسة.', 'Share what is available. We will identify what is needed to complete the review.')}</p>
    <EditorialList lang={lang} items={items} variant="inputs"/>
  </aside>
}

export function ScopeBand({lang, children}: {lang: Language; children: ReactNode}) {
  return <section className="scope-band wrap"><span className="detail-icon" aria-hidden="true"><Info size={26} strokeWidth={1.7}/></span><div>
    <h2>{t(lang, 'حدود النطاق', 'Scope boundaries')}</h2><div>{children}</div>
  </div></section>
}
