import {test, expect} from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

for (const lang of ['ar','en']) {
  test(`${lang}: service sections, RTL keyboard and contextual enquiry`, async({page}, testInfo) => {
    const errors:string[]=[]
    page.on('pageerror', error => errors.push(error.message))
    await page.goto(`/${lang}/services/equipment-planning`)
    await page.evaluate(() => document.fonts.ready)
    const tabs=page.getByRole('tab'), panel=page.locator('[role=tabpanel]:visible')
    await expect(tabs).toHaveCount(5)
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected','true')
    await expect(panel.locator('li')).toHaveCount(3)
    await tabs.nth(1).press(lang==='ar'?'ArrowLeft':'ArrowRight')
    await expect(tabs.nth(2)).toBeFocused()
    await expect(tabs.nth(2)).toHaveAttribute('aria-selected','true')
    await tabs.nth(2).press('End')
    await expect(tabs.last()).toBeFocused()
    await panel.getByRole('button').first().click()
    await expect(panel.getByRole('button').first()).toHaveAttribute('aria-expanded','true')
    await expect(panel.locator('[data-slot=accordion-content]').first()).toBeVisible()
    const accessibility=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()
    expect(accessibility.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([])
    await tabs.last().press('Home')
    await expect(tabs.first()).toBeFocused()
    await expect(panel.locator('li')).toHaveCount(3)
    await tabs.nth(1).click()
    await page.evaluate(() => window.scrollTo({top:0,behavior:'instant'}))
    await page.screenshot({path:testInfo.outputPath(`service-${lang}.png`),fullPage:true,scale:'css'})
    await page.locator('.page-hero .button').click()
    await expect(page).toHaveURL(new RegExp(`/${lang}\\?service=S05#contact$`))
    await expect(page.locator('#service')).toHaveValue('S05')
    expect(errors).toEqual([])
  })

  test(`${lang}: private concept and supporting pages retain their constraints`, async({page}, testInfo) => {
    await page.goto(`/${lang}/concepts/villas-palaces-service-kitchen`)
    const tabs=page.getByRole('tab')
    await expect(tabs).toHaveCount(4)
    await tabs.nth(1).click()
    await expect(page.locator('.concept-sequence')).toBeVisible()
    await expect(page.locator('.concept-sequence li')).not.toHaveCount(0)
    await tabs.nth(2).click()
    await expect(page.locator('[role=tabpanel]:visible .editorial-questions')).toBeVisible()
    await page.locator('.page-hero .button').click()
    await expect(page.locator('#projectType')).toHaveValue('private')
    await expect(page).toHaveURL(new RegExp(`/${lang}\\?concept=C11&type=private#contact$`))
    for (const path of ['services','concepts','engagements','deliverables','about','approach','contact','privacy']) {
      await page.goto(`/${lang}/${path}`)
      await page.evaluate(() => document.fonts.ready)
      await expect(page.locator('h1')).toHaveCount(1)
      await expect(page.locator('main form,main table,main figcaption')).toHaveCount(0)
      expect(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth+1)).toBe(true)
      const hero=page.locator('.page-hero-visual img')
      await expect.poll(()=>hero.evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBe(true)
      if (path==='engagements') await expect(page.getByRole('link',{name:lang==='ar'?'ناقش النطاق المناسب':'Discuss the appropriate scope',exact:true})).toHaveCount(1)
      if (['engagements','deliverables'].includes(path)) await page.screenshot({path:testInfo.outputPath(`${path}-${lang}.png`),fullPage:true,scale:'css'})
    }
  })
}

test('subpage layout remains usable at 320 CSS pixels', async({page}) => {
  await page.setViewportSize({width:320,height:800})
  for (const lang of ['ar','en']) {
    await page.goto(`/${lang}/services/equipment-planning`)
    expect(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth+1)).toBe(true)
    await page.getByRole('tab').last().click()
    await expect(page.locator('[role=tabpanel]:visible')).toBeVisible()
    await page.addStyleTag({content:'.detail-tab-panel,.editorial-input-note{font-size:200%} .editorial-list li{font-size:26px}'})
    expect(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth+1)).toBe(true)
    await page.goto(`/${lang}/concepts/villas-palaces-service-kitchen`)
    await page.getByRole('tab').nth(1).click()
    expect(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth+1)).toBe(true)
  }
})
