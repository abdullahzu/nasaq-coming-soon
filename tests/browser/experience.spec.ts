import {test, expect, type Page} from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

async function ready(page:Page, path:string) {
  const errors:string[]=[]
  page.on('pageerror',error=>errors.push(error.message))
  const response=await page.goto(path)
  expect(response?.status()).toBe(200)
  await page.evaluate(()=>document.fonts.ready)
  await expect(page.locator('h1')).toHaveCount(1)
  await expect(page.locator('.nasaq-shell')).toHaveCSS('background-color','rgb(246, 245, 237)')
  return errors
}

for(const lang of ['ar','en']) {
  test(`${lang}: windows expand, collapse, preserve focus and navigate`,async({page})=>{
    const errors=await ready(page,`/${lang}`)
    await expect(page.locator('html')).toHaveAttribute('dir',lang==='ar'?'rtl':'ltr')
    const windows=page.locator('.service-window'), panel=page.locator('#window-detail')
    await expect(windows).toHaveCount(4)
    await windows.nth(1).click()
    await expect(windows.nth(1)).toHaveAttribute('aria-expanded','true')
    await expect(panel.locator('h3')).toHaveText(lang==='ar'?'مواءمة قائمة الطعام والمساحة':'Menu and space validation')
    await expect(panel.locator('a.button')).toHaveAttribute('href',`/${lang}?service=S03#contact`)
    await windows.nth(1).click()
    await expect(panel).toBeHidden()
    await windows.nth(2).press('Enter')
    await expect(panel).toBeVisible()
    await panel.locator('.window-close').click()
    await expect(windows.nth(2)).toBeFocused()
    await windows.nth(2).press('Home')
    await expect(windows.nth(0)).toBeFocused()
    await windows.nth(0).press('Enter')
    await panel.locator('.window-full-link').click()
    await expect(page).toHaveURL(new RegExp(`/${lang}/services/equipment-planning$`))
    await expect(page.locator('.page-hero-visual img')).toBeVisible()
    expect(errors).toEqual([])
  })

  test(`${lang}: language preserves service, concept and inquiry anchor`,async({page})=>{
    await ready(page,`/${lang}?service=S05&concept=C11&type=private#contact`)
    await expect(page.locator('#service')).toHaveValue('S05')
    await expect(page.locator('#projectType')).toHaveValue('private')
    const other=lang==='ar'?'en':'ar'
    await expect(page.locator('.lang-link')).toHaveAttribute('href',`/${other}?service=S05&concept=C11&type=private#contact`)
    await page.locator('.lang-link').click()
    await expect(page.locator('html')).toHaveAttribute('lang',other)
    await expect(page.locator('#service')).toHaveValue('S05')
    await expect(page.locator('#projectType')).toHaveValue('private')
  })

  test(`${lang}: inquiry validates, retains failed entries and confirms mocked delivery`,async({page})=>{
    let sent=0
    await page.route('**/api/contact',async route=>{
      sent++
      expect(route.request().postDataJSON().language).toBe(lang)
      await route.fulfill({status:sent===1?503:200,contentType:'application/json',body:JSON.stringify({success:sent>1})})
    })
    await ready(page,`/${lang}#contact`)
    const submit=page.locator('.submit-button')
    await submit.click()
    await expect(page.locator('#name')).toBeFocused()
    expect(sent).toBe(0)
    await page.locator('#name').fill('Website QA')
    await page.locator('#enquiry-contact').fill('qa@example.com')
    await page.locator('#projectType').selectOption('restaurant')
    await page.locator('#note').fill('Mock-only browser review. No message is delivered.')
    await submit.click()
    await expect(page.locator('.form-error')).toBeVisible()
    await expect(page.locator('#name')).toHaveValue('Website QA')
    await submit.click()
    await expect(page.locator('.form-success')).toBeVisible()
    expect(sent).toBe(2)
  })

  test(`${lang}: menu, deep links and responsive layouts`,async({page},testInfo)=>{
    await ready(page,`/${lang}`)
    const toggle=page.locator('.menu-toggle')
    if(await toggle.isVisible()) {
      await toggle.click()
      await expect(page.locator('#mobile-navigation')).toBeVisible()
      await toggle.press('Escape')
      await expect(page.locator('#mobile-navigation')).toBeHidden()
      await expect(toggle).toBeFocused()
    }
    for(const path of ['', '/services/equipment-planning','/engagements','/deliverables','/concepts/villas-palaces-service-kitchen']) {
      await page.goto(`/${lang}${path}`)
      await page.evaluate(()=>document.fonts.ready)
      expect(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth+1)).toBe(true)
      await expect(page.locator('main form')).toHaveCount(path?0:1)
      if(path==='/deliverables')await expect(page.locator('main table')).toHaveCount(0)
      if(path) {
        const image=page.locator('.page-hero-visual img')
        await expect(image).toBeVisible()
        await expect.poll(()=>image.evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBe(true)
      }
    }
    await page.goto(`/${lang}`)
    await page.evaluate(()=>document.fonts.ready)
    // CSS-pixel output avoids WebKit's 32767px limit at mobile deviceScaleFactor=3.
    await page.screenshot({path:testInfo.outputPath(`homepage-${lang}.png`),fullPage:true,scale:'css'})
  })

  test(`${lang}: accessibility and reduced motion`,async({page})=>{
    await page.emulateMedia({reducedMotion:'reduce'})
    await ready(page,`/${lang}`)
    await expect(page.locator('.service-window').first()).toHaveCSS('transition-duration','0s')
    for(const path of ['', '/services/equipment-planning']) {
      if(path)await page.goto(`/${lang}${path}`)
      const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()
      expect(result.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)}))).toEqual([])
    }
  })
}

test('narrow 320px and large text layouts do not overflow',async({page})=>{
  await page.setViewportSize({width:320,height:750})
  for(const lang of ['ar','en']) {
    await ready(page,`/${lang}`)
    expect(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth+1)).toBe(true)
    await page.addStyleTag({content:'.nasaq-shell{font-size:200%} .window-title{font-size:26px} .main-nav a{font-size:26px}'})
    expect(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth+1)).toBe(true)
  }
})
