# NASAQ website: benchmark analysis and master development prompt

Prepared 26 September 2026. Deliverable: a development brief and reusable prompt. This document does not change or publish the website.

## Recommended direction

Build a bilingual advisory website around the decisions NASAQ helps clients make. Give the home page a strong full-counter image and a concise introduction, then let visitors explore the exact service, project concept, or engagement route relevant to them. Make the technical work visible through clearly labelled examples of deliverables.

The proposed complete architecture contains **30 content pages, each in Arabic and English: 60 localized content URLs**. It comprises nine core pages, ten service detail pages, and eleven concept detail pages. The villa and palace page is one of the eleven concepts, not an additional duplicate. Error pages, redirects, and a submission confirmation state are outside this count.

This page count is a proposed architecture, not a brand requirement. The shared page templates make it manageable. Develop and review it in batches, but do not create thin pages merely to reach a number. All eleven concepts must be represented on the concepts hub even if a detail page needs further source material.

## Benchmark analysis

The observations below concern visible content and design patterns. No conversion data, analytics, internal systems, or measured commercial performance were available.

| Benchmark | Observed approach | Useful application for NASAQ | Boundary |
|---|---|---|---|
| [AYEN](https://ayen.com.sa/) | Its official content explains named inspection packages, the report received, booking steps, and common customer questions. | Explain what a client receives, when to engage, and how to begin. Make NASAQ’s five engagement packages understandable without inventing fixed commercial inclusions. | The homepage remained behind security verification in the review browser. This is an official-content review, not a verified homepage visual audit. Inspection pricing, booking, credentials, and regulatory claims do not transfer to NASAQ. |
| [MCTS](https://www.mctservices.com/) | Large architectural imagery establishes the field. Dedicated service content describes design stages; project pages identify scope and location. | Use confident operational photography, detailed service pages, and a clear scope structure. When NASAQ has approved project evidence, present its actual role and outputs. | The visible desktop hero gives considerable space to imagery. NASAQ should put its decision value and next action prominently beside the image. Do not import MCTS’s project statistics, client work, laundry offering, or waste-management offering. |
| [GGB Consulting](https://ggb.consulting/) | Entry routes are organised by business situation. Detailed sections connect workstreams to deliverables and decisions. The site labels conceptual imagery and distinguishes kinds of evidence. | Give visitors a small number of relevant starting routes. Tie NASAQ services to concrete outputs and use honest labels on illustrative examples. | The desktop presentation is visually dense. NASAQ should use its own quieter typography, palette, and narrower scope. Do not import restaurant turnaround, AI, franchising, licensing, or launch-management services. |

Design synthesis: **AYEN’s service explanation, MCTS’s technical specificity, and GGB’s decision-led navigation, expressed in NASAQ’s own identity.** This is a design recommendation, not a claim that any benchmark’s approach has proven conversion superiority.

## How to use this document

Give the implementation agent the complete prompt below, the current NASAQ source repository, `NASAQ_design-system_v2.0_Profile_Final.md`, the current company profile, and original approved logo/image assets. Keep the service and concept appendices with the prompt. Start in preview mode.

---

# BEGIN MASTER PROMPT

## 1. Role, objective, and execution mode

Act as one integrated team covering brand strategy, Arabic and English copywriting, conversion design, art direction, front-end development, accessibility, and quality assurance. Apply each discipline’s judgement to one coherent result. Do not claim that external specialists have reviewed the work unless they actually have.

Transform NASAQ’s existing home page into a complete, distinctive bilingual website for foodservice design and advisory. Expand it with useful service and concept pages, a clear approach, engagement options, deliverable examples, company information, and project enquiry.

The visitor should quickly understand:

1. What NASAQ does and why operational planning comes first.
2. Whether NASAQ is relevant to their project and current decision.
3. What the relevant service produces and what it does not include.
4. What information to share to begin a conversation.

Default mode is **build, test, and present a reviewable preview**. Do not publish this new release to `nasaqfb.com`, modify production domain settings, or merge into a branch that automatically deploys production without approval covering this release. Earlier approval for a previous release is not approval for an unreviewed expansion. If explicit approval already covers the exact new release, act on it without asking again. Complete the reviewable work before requesting any outstanding final production approval.

Continue through normal reversible design and implementation choices. Record assumptions and resolve them sensibly. Ask only about missing information that materially changes the outcome. If one asset or factual claim is missing, keep working on the rest and identify that specific gap.

## 2. Source authority and factual boundaries

Use this precedence:

1. The user’s latest explicit instructions for this release.
2. The latest supplied NASAQ design system and approved original logo geometry.
3. The NASAQ company profile and canonical catalogues reproduced below.
4. Previously approved website copy where it does not conflict with newer material.
5. External benchmarks as inspiration for structure and usability only.

Source files known for this brief:

- `NASAQ_design-system_v2.0_Profile_Final.md`, MD 2.0, reviewed revision dated 14 September 2026.
- `NASAQ_Company_Profile_COMPLETE_MD2.0.md`, the companion company profile.
- Existing source: [abdullahzu/nasaq-coming-soon](https://github.com/abdullahzu/nasaq-coming-soon). Inspect the current source, instructions, assets, tests, deployment configuration, and current branch state before choosing an implementation strategy. This brief does not assert the repository’s present deployment status.

Read the actual source files at implementation time. If a newer supplied revision exists, compare it and update the brief’s implementation assumptions. Do not invent a version or silently substitute an old brand guide.

Keep three different catalogue types separate:

- **Services:** ten kinds of professional assistance, each with a dedicated page.
- **Concepts:** eleven types of foodservice operation, each with relevant operational needs.
- **Packages:** five named ways of structuring an engagement. Their names are approved; detailed inclusions, prices, durations, and service combinations are not established by this prompt.

Do not invent clients, testimonials, team biographies, awards, licences, accreditations, project counts, years of experience, measured savings, response times, or guarantees. A conceptual kitchen is not a completed NASAQ project. Feasibility support is not automatically a full investment model. MEP requirements are not automatically licensed statutory engineering design. Define the actual agreed scope.

Retain independent owner-side positioning. Do not turn the site into an equipment shop, supplier marketplace, construction contractor, or full restaurant-operations consultancy. Confidentiality follows the engagement terms; do not promise unlimited or technically unverified security.

## 3. Canonical identity and bilingual wording

Preserve these strings exactly wherever used as brand statements:

| Purpose | العربية | English |
|---|---|---|
| Brand | نَسَق | NASAQ |
| Descriptor | تصميم واستشارات مرافق الأغذية والمشروبات | Foodservice Design & Advisory |
| Slogan | التشغيل قبل المساحة | Operational Flow Before Space |
| Positioning | نخطّط لمنظومة الحركة والتشغيل، ثم نصمّم المساحة حولها. | We plan the operational flow, then design the space around it. |
| Primary CTA | ناقش مشروعك | Discuss Your Project |
| Secondary CTA | اطلب مراجعة المخطط | Request a Layout Review |
| Contact destination | growth@nasaqfb.com | growth@nasaqfb.com |

The layout-review CTA requests a conversation about a review. It does not imply that the review is free, immediate, or includes a specified deliverable.

Arabic is the primary design language, with native RTL composition. English is a complete LTR version, not abbreviated secondary content. Write natural professional Arabic and clear English. Use the current catalogue’s Arabic terminology for MEP and CAPEX instead of carrying forward older spelling or terminology errors.

The prior supporting sentence may be retained where it fits:

**AR:** نحوّل المنيو وطريقة التشغيل إلى تدفق واضح، تخطيط مدروس، متطلبات هندسية دقيقة، ونطاق يمكن تنفيذه وتسعيره.

**EN:** We turn the menu and operating model into clear flow, considered planning, coordinated engineering requirements, and an actionable scope.

New page headings and explanatory copy may be drafted within the approved positioning. Mark new factual claims for verification in the internal content record. Public pages must not show editorial placeholders. Remove the old coming-soon notice when the complete site is actually ready for release.

## 4. Information architecture and routes

Use equivalent, crawlable Arabic and English URLs. In this brief, `/{lang}/` means `/ar/` or `/en/`. Shared English slugs are acceptable in both language paths. Preserve existing indexed URLs or provide deliberate redirects after checking the actual site.

### Nine core content pages

| Route | Arabic navigation/page label | English label | Main job |
|---|---|---|---|
| `/{lang}/` | الرئيسية | Home | Position NASAQ and route visitors to relevant help. |
| `/{lang}/about/` | عن نَسَق | About NASAQ | Explain the company, independent role, audiences, and verified presence. |
| `/{lang}/approach/` | منهج نَسَق | Our Approach | Explain how operational inputs become coordinated decisions. |
| `/{lang}/services/` | الخدمات | Services | Present all ten services and their distinct outcomes. |
| `/{lang}/engagements/` | باقات العمل | Engagement Packages | Explain the five approved package names and scope-setting process. |
| `/{lang}/concepts/` | مفاهيم المشاريع | Project Concepts | Present all eleven concepts and their operational differences. |
| `/{lang}/deliverables/` | المخرجات | Deliverables | Show labelled examples of the work a scoped engagement can produce. |
| `/{lang}/contact/` | ناقش مشروعك | Discuss Your Project | Capture an appropriate project brief with a functioning enquiry form. |
| `/{lang}/privacy/` | الخصوصية | Privacy | Explain the actual data collection, processing, and contact arrangements. |

Add the ten service and eleven concept routes in Appendices A and B. Use a real HTTP 404 for missing pages with bilingual recovery links. A form success state need not be an indexable standalone page.

Do not launch an empty blog, invented portfolio, or page of unverified testimonials. Add a project/case-study section when approved evidence exists. Add insights only when useful, reviewed articles can be supplied. Neither is needed to make the initial architecture complete.

### Navigation

Use the approved logo, four compact primary entries, a language control, and the primary CTA:

| العربية | English | Destination |
|---|---|---|
| المنهج | Approach | Approach page |
| الخدمات | Services | Services hub, with accessible links to services and packages |
| مفاهيم المشاريع | Project Concepts | Concepts hub |
| المشاريع الخاصة | Private Projects | Villa and palace concept page |

The CTA goes to Contact. Put About, Deliverables, Engagement Packages, Contact, and Privacy in a well-organised footer and appropriate contextual links. Do not overload the header with all 30 destinations. On small screens use a keyboard-accessible menu, visible language control, and an easy-to-find enquiry action.

Breadcrumbs belong on detail pages. The language switch must open the equivalent page and retain valid enquiry selections. It must not send every visitor back to the home page.

## 5. Creative direction: show the operating logic

Use NASAQ’s editorial precision: calm open space, strong Arabic typesetting, carefully proportioned photography, and concise technical annotation. The visual idea is that an ordered working environment comes from an ordered operating brief.

Use a full professional counter as the first visual. Show the complete work surface and its relationship to circulation and service. The sink may be a small secondary component, never the central subject. Preserve the established private-kitchen service-trolley direction.

A restrained flow line may connect selected editorial moments. Use one continuous path with a clear meaning, a 2 px stroke, corners around 24 px, and at most three turns in a single motif. Use a rounded diamond only for a decision. Create precise diagrams in SVG/HTML, with real labels outside photographic artwork. Keep the page readable without animation.

Avoid converting every paragraph into a card. Use open columns, rules, lists, captions, and alternating text/image relationships. Use panels where they genuinely help compare or interact. Do not copy a benchmark’s layout, imagery, logo, distinctive artwork, or wording.

### Required design tokens

| Role | Value |
|---|---|
| Primary teal | `#0D5B63` |
| Slate text | `#2F3741` |
| Canvas | `#F7F8F9` |
| White | `#FFFFFF` |
| Neutral divider | `#E6E8EB` |
| Muted text | `#586773` |
| Control boundary | `#73818C` |
| Mint accent | `#4FAE90` |
| Mist | `#E5F3F0` |
| Teal hover / active | `#09464D` / `#073A40` |

Mint is a restrained accent, not small text on white or the sole boundary of an interactive control. Do not replace NASAQ teal with a benchmark’s orange, yellow, or blue.

Self-host the licensed **Noto Sans Arabic** and **Noto Sans**, weights 400 and 700. Confirm that font files actually load. Keep their licence notices. No decorative Arabic letter spacing or inserted tatweel.

| Text | Arabic | English |
|---|---|---|
| Hero | 40–64 px, line-height 1.35 | 36–56 px, line-height 1.20 |
| Section heading | 40 px desktop | 36 px desktop |
| Subheading | 26 px | 24 px |
| Body | 20 px, line-height 1.70 | 18 px, line-height 1.55 |
| Caption | 14 px | 14 px |

Use responsive values within the guide, with smaller heading sizes where necessary on phones. Keep body copy comfortably readable. Use a 1152 px maximum content width, 48 px desktop/tablet outer margins where space permits, 24 px mobile margins, and 24 px gutters. Use the approved spacing scale: 0, 4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 112, 128 px. Default radii: 4 px controls, 8 px genuine UI panels.

Use the authentic logo asset without retyping, redrawing, tracing, filtering, recolouring, stretching, or mirroring it. Respect the guide’s minimum painted logo width, rather than just the dimensions of a padded image file. The horizontal logo should be at least 220 px where that lockup is used, preferably 260 px; a separately set descriptor is at least 14 px. If mobile space requires an approved symbol lockup, use the genuine approved asset, minimum 32 px and preferably 48 px. If original assets cannot be recovered, identify the missing asset and do not represent a substitute as approved.

## 6. Home page specification

Create eight purposeful content modules, plus header and footer. The home page should introduce the offer and encourage exploration rather than reproduce every detail page. Use no autoplay video, rotating hero, forced scroll sequence, decorative counters, or intrusive lead modal.

### H1. Hero: the operating idea, immediately visible

Desktop: approximately 44% text and 56% image, adjusted to actual content. In Arabic, give the reading sequence priority on the right; in English, on the left. Use live text on a clean canvas beside the image. Mobile: text, actions, then the complete-counter image. Do not force the image into a narrow crop that loses either end of the counter.

Content order: concise service descriptor, canonical slogan as the page H1, canonical positioning sentence, primary CTA, secondary CTA. Use the supporting sentence only if the composition has room without burying the actions. Add a short audience line lower in the hero if useful.

The dominant image should feel like architectural editorial photography of a foodservice environment. Use asset A1 below. Show a discreet caption such as **تصوّر توضيحي / Illustrative concept** if it is generated or staged conceptual imagery. No project or client attribution without evidence.

### H2. A route for the visitor’s current question

Draft section heading: **ما القرار الذي تريد توضيحه؟ / Which decision needs clarity?**

Use four short, directly linked choices. No multi-step quiz is required.

| Visitor situation | Destination | Supporting intent |
|---|---|---|
| فكرة قبل الالتزام / An idea before commitment | Pre-contract clarity | Understand the scope, assumptions, and early decisions. |
| قائمة طعام ومساحة / A menu and a space | Menu and space validation | Test operational fit and capacity. |
| معدات وعروض موردين / Equipment and supplier offers | Supplier offer comparison | Understand differences in scope and specification. |
| مشروع خاص / A private project | Villa and palace concept | Discuss service movement, coordination, and privacy. |

Keep these as navigational choices, not additional services or claims about automated assessment.

### H3. The NASAQ approach

Use a concise explanation and an accessible sequence:

**Menu → Operating model → Workflow → Space → Equipment → Engineering → Cost → Scope.**

Arabic labels: **المنيو، نموذج التشغيل، تدفق العمل، المساحة، المعدات، الخدمات الهندسية، التكلفة، النطاق.**

Use a horizontal or gently stepped sequence on desktop and a vertical reading order on mobile. The semantic order stays consistent in both languages. Pair it with three short benefits grounded in the profile: earlier clarity, coordinated requirements, and comparable scope. Link to the Approach page. Do not show unsubstantiated improvement percentages.

### H4. Services: a readable directory

Show the ten official service names in four editorial groups. These groups are navigation aids, not new packages:

- Early decisions: services 01, 02, 03.
- Technical definition: services 05, 06, 07.
- Commercial comparison: services 04, 08.
- Owner-side and private support: services 09, 10.

Each service name links to its dedicated page. Keep the home summary to one useful line per group. Avoid ten equal image cards. Provide a clear link to the complete Services hub.

### H5. Different concepts, different operating needs

Feature four concepts: specialty coffee and bakery, central kitchen, multi-brand cloud kitchen, and villa/palace service kitchen. Use a two-image editorial composition with smaller text links, rather than four unrelated stock photographs. Give the private-kitchen feature sufficient prominence and use the service-trolley asset.

For each concept explain one operational question, then link to its page. All eleven concepts must be discoverable from the hub. A concept image illustrates that type of operation; it is not portfolio evidence.

### H6. What clear scope looks like

Show three readable examples: an equipment schedule, a utility-requirements table, and a supplier comparison matrix. Build these as accurate HTML or SVG examples, using short fictitious identifiers and no confidential customer data. Label them **نموذج توضيحي / Illustrative template**.

Explain what decision each example supports. Link to Deliverables. Do not promise that every engagement includes all three. Keep fabricated numbers out unless they are needed for an explicitly labelled worked illustration.

### H7. Engagement routes

Present all five canonical package names in a simple sequence or compact comparison. Say that scope is agreed around the project stage and need. Link to Engagement Packages. Do not add pricing, delivery-day badges, guaranteed inclusions, or a “most popular” badge without source evidence.

### H8. Project conversation

Use the approved idea **كلما بدأنا أبكر، كان القرار أوضح. / The earlier we begin, the clearer the decision.** End with one strong CTA to Contact and a visible `growth@nasaqfb.com` contact reference. Do not embed a long duplicate form in every page.

## 7. Service detail template

Each of the ten pages must have original, service-specific content. Target roughly 350–600 useful English words and equivalent Arabic meaning, but prefer completeness and clarity to word-count padding.

Use this structure:

1. Breadcrumb, exact service name, and a one-sentence explanation of the decision it supports.
2. “When this helps”: three practical situations, drawn from the service scope.
3. “What we clarify”: the three approved deliverable statements in Appendix A.
4. “What we need to start”: a short service-specific input list. Distinguish necessary information from helpful information that may not yet exist.
5. “How the work proceeds”: a concise, realistic sequence without invented turnaround promises.
6. One relevant illustrative output or carefully chosen image. A technical service may use a diagram instead of a photo.
7. Scope notes: assumptions, level of development, related specialist responsibilities, and boundaries specific to that service.
8. Three to five useful FAQs with answers grounded in approved scope. Put genuinely shared questions on the hub to avoid repetition.
9. Two or three relevant service/concept links and the primary CTA.

Examples of input distinctions: supplier comparison needs available offers and scope documents; menu validation needs a menu or menu assumptions plus a layout or dimensions; equipment planning needs menu, expected capacity, and available utility information. Do not pretend that a complete technical drawing is required for an early conversation.

Pass a stable service identifier to the contact form when a visitor selects a service CTA. Preserve that selection visibly and allow editing. Validate identifiers server-side; never derive an email destination from a query parameter.

## 8. Concept pages and the private-project experience

Use Appendix B for exact names, routes, and proposed editorial angles. Each concept page should cover its operating pattern, typical planning questions, relevant NASAQ services, useful starting information, one visual or diagram, and an enquiry CTA. Match services by relevance; do not imply a fixed commercial bundle.

The villa and palace page should feel discreet and precise. Explain daily service, hospitality occasions, staff movement, storage, equipment, and coordination with the home’s architecture. Keep the trolley a supporting element within a complete service environment. Use no private residence names, recognisable client details, or real layouts without permission.

Provide a clear private-project choice on the enquiry form. Do not solicit floor plans, security details, household identities, or confidential attachments through an unverified upload widget. The first step is a short brief; agree an appropriate document-sharing route later.

Do not publish eleven near-identical concept pages with nouns swapped. The hub must work even if a detail page has not cleared the content-quality gate. No links to empty or “coming soon” detail pages.

## 9. Engagements, approach, company, and deliverables

### Engagement Packages

Use the approved names exactly:

| العربية | English |
|---|---|
| وضوح البداية | Clarity Sprint |
| تحقق المفهوم | Concept Validation |
| حزمة التخطيط الفني | Technical Planning Pack |
| حزمة العطاء والقرار | Tender & Decision Pack |
| مستشار المالك | Owner-Side Advisory |

Explain the scope-setting conversation, the possibility of combining relevant work, and the need to define responsibilities and deliverables in the engagement. Draft stage descriptions may follow the names, but keep specific inclusion matrices, prices, duration, review rounds, and exclusions in the internal review draft until commercially confirmed. A package name containing “Sprint” is not evidence of a fixed duration.

### Approach

Expand the menu-to-scope sequence into inputs, decisions, and outputs. Explain assumption management, coordination, scope clarity, and owner-side review. Make the process understandable to investors and architects as well as operators. Use an accessible HTML/SVG flow illustration and descriptive text; avoid a large decorative systems graph.

### About

Explain who NASAQ serves and how the advisory role works. Use verified company-profile facts, including geographic presence only as documented. Do not invent street addresses, branch opening hours, registrations, or staff. Use original verified portraits only if supplied and authorised; otherwise use the company’s work and principles as the basis of the page.

### Deliverables

Show examples such as a project brief, menu/capacity matrix, space programme, flow diagram, equipment schedule, utility schedule, stainless-steel BOQ, indicative CAPEX estimate, supplier matrix, and risk/decision register. These are potential scoped outputs, not a universal entitlement.

For each displayed example identify its purpose, relevant service, status as a template or approved redacted work, and assumptions. Build examples in readable, selectable text. A screenshot or abstract document pile must not be the only explanation. Download links must work and be reviewed; never create fake download buttons.

## 10. Original imagery and art direction

First audit the approved NASAQ assets. Reuse strong, relevant images if they fit the new layout. Generate or license missing visuals; do not download competitors’ photographs. Keep a record of source, licence or generation status, usage, alt text, and crop.

Use one consistent visual family: premium operational spaces, warm neutral daylight, restrained teal accents, brushed stainless steel, pale stone, believable equipment, clear circulation, and architectural proportions. Avoid generic skyscrapers, decorative food close-ups as service proof, luxury excess, stock handshakes, holograms, and floating machinery.

Create photography with an image-generation tool where appropriate. Create logos, exact plans, data tables, and technical diagrams from authentic assets or code/vector tools. An image model must not fabricate NASAQ’s logo or a drawing presented as buildable engineering.

### Asset A1: full-counter hero

**Generation brief:** Create an original premium architectural editorial photograph of a complete professional foodservice preparation counter, visible from end to end, in a calm contemporary operational kitchen. Use brushed stainless steel, pale warm surfaces, restrained deep-teal detailing, soft directional daylight, and believable equipment proportions. Show generous working circulation and an orderly preparation-to-service relationship. A small sink may appear as one secondary component. A subtle plan sheet may sit on a separate work surface, without readable writing or technical claims. Eye-level three-quarter view, natural perspective, realistic materials, no people, no text, no logo, no arrows, no labels, no collage, no extreme wide-angle distortion. Keep both ends of the counter inside the central safe composition. Deliver a wide landscape master suitable for an approximately 8:5 hero. This is an illustrative concept, not a photographed NASAQ client project.

**Alt AR:** كاونتر تجهيز احترافي كامل ضمن مساحة عمل منظمة ومسار خدمة واضح.

**Alt EN:** A complete professional preparation counter within an organised workspace and service route.

Keep the full counter visible on mobile using a landscape frame or a separately composed crop. Do not mirror the photo when the language changes.

### Asset A2: villa and palace service kitchen

**Generation brief:** Create an original architectural editorial photograph of a discreet private service kitchen connected to a refined hospitality area. Show a complete understated service environment, a carefully proportioned stainless-steel preparation counter, and an elegant service trolley positioned naturally along a clear circulation route. Soft warm light, pale stone, subtle wood, and restrained NASAQ teal accents. Communicate organised daily service and hospitality without ostentatious palace decoration. No people, no visible residence identity, no text, no logo, no arrows, no diagram overlay. Realistic doorways, trolley wheels, handles, and equipment. Wide landscape composition with space around the trolley. Label in the website as illustrative imagery.

**Alt AR:** عربة خدمة ضمن مطبخ خاص يربط التحضير بمسار الضيافة.

**Alt EN:** A service trolley in a private kitchen connecting preparation with hospitality service.

### Asset A3: specialty coffee and bakery

**Generation brief:** Create an original calm architectural photograph of a specialty-coffee and bakery counter seen from a three-quarter operational viewpoint. Show the relationship between espresso preparation, bakery display, a complete work surface, and customer handover, with credible work aisles. Warm neutral light, brushed steel, pale surfaces, and a small deep-teal detail. Keep equipment generic and unbranded. No readable packaging, text, people, logos, arrows, or artificial floating objects. Give the scene the same photographic treatment as the NASAQ full-counter hero. This is an illustrative operational concept, not a claim of completed work.

**Alt AR:** كاونتر قهوة ومخبز يوضح مناطق التحضير والعرض وتسليم الطلبات.

**Alt EN:** A coffee and bakery counter showing preparation, display, and order handover areas.

### Asset A4: central kitchen

**Generation brief:** Create an original architectural editorial image of a central production kitchen with a sequence of full preparation benches, credible storage, and a visible packing or dispatch area. Emphasise orderly spatial relationships and realistic scale through a gently elevated three-quarter viewpoint. Use restrained neutral materials, brushed stainless steel, and soft even lighting. No staff, text, brands, numbers, arrows, oversized machinery, or claims of certified compliance. Avoid food-contact hazards and impossible equipment geometry. Make an attractive conceptual environment whose operational assumptions will be explained separately in live text.

**Alt AR:** مناطق تجهيز وتعبئة ضمن تصوّر توضيحي لمطبخ مركزي.

**Alt EN:** Preparation and packing areas in an illustrative central-kitchen concept.

### Asset A5: multi-brand cloud kitchen

**Generation brief:** Create an original realistic editorial view of a compact multi-brand delivery kitchen, showing distinct preparation stations and a calm shared packing-and-dispatch counter. Separate the visible functions through credible spatial organisation, not coloured arrows or text. Use the NASAQ image family: warm pale surfaces, stainless steel, soft daylight, and restrained deep teal. Generic unbranded containers only. No people, logos, legible labels, screens with fabricated data, or claims of regulatory compliance. Maintain plausible working clearances and coherent equipment proportions. Landscape composition suitable for a concept page.

**Alt AR:** محطات تجهيز متعددة مع منطقة مشتركة لتعبئة وتسليم طلبات التوصيل.

**Alt EN:** Multiple preparation stations with a shared delivery packing and handover area.

### Asset A6: material and scope study

**Generation brief:** Create an original minimal editorial still life combining a small brushed-stainless-steel material sample, a neutral architectural scale, and a neatly folded blank plan sheet on a pale surface. Precise natural shadows, restrained deep-teal background detail, strong negative space, refined texture, realistic scale. No readable numbers, text, logos, glowing effects, futuristic interfaces, or invented engineering annotations. This is a supporting material study for an advisory website, not technical documentation.

Use only where it helps a technical page. If purely decorative, provide an empty alt attribute rather than repeating surrounding text.

### Technical artwork and production requirements

- Create the flow sequence, equipment schedule, utility schedule, supplier comparison, and service relationships as accurate accessible HTML/SVG.
- Use actual text for labels. Do not bake Arabic or English marketing copy into raster images.
- Keep generated imagery clearly distinct from client work through captions and page context. Alt text should describe the actual selected image, not the intended prompt.
- Select approximately three photographic placements on the home page: hero, concept feature, and private-kitchen feature. Reuse the visual family across detail pages without repeating a hero on every section.
- Supply responsive AVIF/WebP derivatives with a supported fallback where needed, explicit dimensions, useful `srcset`/`sizes`, and reviewed desktop/mobile crops. Optimisation may resize or compress an image without changing its composition.
- Treat 350 KB for the main hero derivative and 200 KB for ordinary content derivatives as initial engineering budgets, not absolute quality guarantees. Record justified exceptions.
- Load the hero promptly; lazy-load below-the-fold photos. Do not make a decorative image the only source of meaning.

## 11. Enquiry experience and content

Use one main form on Contact. Preserve useful established fields while making requirements clear:

| Field | Requirement | Behaviour |
|---|---|---|
| الاسم / Name | Required | Visible label and appropriate autocomplete. |
| الشركة / Company | Optional | Company or project context; do not block individuals. |
| نوع المشروع / Project type | Required | Include the established categories and an “Other” choice. |
| المدينة والدولة / City and country | Optional at first enquiry | Accept free text without a forced location service. |
| البريد الإلكتروني أو الجوال / Email or mobile | Required | Accept either contact method and explain validation clearly. |
| المرحلة الحالية / Current stage | Optional | Idea, available space, planning, supplier comparison, or other. |
| الخدمة محل الاهتمام / Service of interest | Optional | Preselect from a service CTA; always editable. |
| نبذة مختصرة عن المشروع / Short project note | Required | Prompt for menu, available space, stage, and timing if known. |

Retain the established project categories: new restaurant/café, existing branch/renovation, central kitchen/production, hotel/hospitality, villa/palace service kitchen, supplier-offer/CAPEX review, and other. A service or concept preselection can refine these without replacing the user’s choice.

Keep the form short in appearance, with clear optional fields. Do not ask for a budget, phone number, and email as three separate mandatory hurdles. Do not promise a response time that NASAQ has not confirmed.

Send enquiries through the existing secure server-side mechanism to the fixed recipient `growth@nasaqfb.com`. Never substitute a `mailto:` action for submission. Inspect the current backend before changing it. Do not expose credentials in client code, accept user-controlled recipients, or trust client-side validation alone.

Implement appropriate length limits, server validation, safe email formatting, duplicate-submission protection, request-size limits, and proportionate spam/rate controls. Preserve successful existing controls. If CAPTCHA becomes necessary, integrate it accessibly and explain it; do not add friction without evidence.

Use these established status messages, with truthful backend semantics:

| State | العربية | English |
|---|---|---|
| Submit | أرسل تفاصيل المشروع | Send Project Details |
| Sending | جارٍ إرسال تفاصيل المشروع… | Sending your project details… |
| Missing type | اختر نوع المشروع للمتابعة. | Choose a project type to continue. |
| Success | تم إرسال رسالتك بنجاح. سيتواصل معك فريق نَسَق بعد مراجعتها. | Your message was sent successfully. The NASAQ team will review it and get back to you. |
| Error | تعذر إرسال الرسالة الآن. يرجى المحاولة مرة أخرى بعد قليل. | The message could not be sent. Please try again shortly. |

Only show success after the configured backend confirms acceptance for sending. Do not claim confirmed inbox delivery merely from a successful API response. Preserve entered details after an error. Announce errors and status changes accessibly and associate errors with their fields.

A preview must use a clearly identified test mode or controlled test endpoint. It must not silently send test submissions to the real team. Production mail verification is a separate reported check, performed only when a real test send is authorised. If production email configuration is unavailable, report that exact limitation and keep the rest of the preview functional.

The Privacy page must describe the real implementation: fields collected, enquiry purpose, relevant processing services, actual retention arrangements, and the contact for requests. Do not invent a retention period or present generic legal copy as verified. Keep analytics optional and separate from enquiry collection. Do not add marketing consent automatically or precheck it.

## 12. Development, SEO, and maintainability

Keep the existing stack if it can serve these pages well. A multi-page expansion is not by itself a reason to migrate frameworks. Inspect the current static build, Worker/API, hosting configuration, tests, and release workflow first. Use one maintainable content model and shared templates, not 60 separately maintained page files with divergent copy.

Create stable identifiers for services, concepts, packages, language pairs, and navigation. Store translatable content independently from layout. Every public detail page must be directly accessible and have meaningful server-rendered or pre-rendered content. Avoid a client-only language toggle as the only way to reach English content.

Use logical CSS properties for RTL/LTR, sensible semantic markup, and progressive enhancement. Use native links for navigation and buttons for actions. Avoid unnecessary JavaScript, animation libraries, and a CMS unless the editing workflow warrants them.

SEO requirements:

- Unique page titles, descriptions, one clear H1, and descriptive internal links in both languages.
- Correct document `lang` and `dir` values.
- Self-canonical URLs and reciprocal Arabic/English `hreflang` links, including each page itself. Use fully qualified production URLs only when production is configured. Add an appropriate `x-default` fallback deliberately.
- A consistent root route policy: default to Arabic with an explicit language choice. Do not force geolocation redirects that prevent language access.
- A sitemap containing only publishable canonical content pages; useful robots directives; no indexing of staging, query-only enquiry states, or unfinished pages.
- Relevant structured data only where supported by visible, verified content. Do not add invented review ratings or assume FAQ markup guarantees enhanced search display.
- Redirects for changed indexed routes and tests for old anchor links where the existing one-page site used them.
- Correct social previews, original share artwork, image dimensions, and working favicons using approved brand assets.

Use access protection for confidential previews where available; `noindex` is an indexing instruction, not an access-control system. Keep staging hostnames, content, and deployment actions separate from production.

If measurement is enabled by the site owner, define lightweight events such as `service_view`, `concept_view`, `enquiry_start`, and `enquiry_success`, with language and stable content IDs. Do not send names, contact details, free-text briefs, or private project information to analytics. Do not invent a conversion baseline.

## 13. Accessibility, responsiveness, and verification

Target WCAG 2.2 AA and test what the implementation actually does. Automated checks alone are not proof of conformance.

Check keyboard navigation, skip link, headings, landmarks, focus visibility, menu opening/closing, language switching, form labels/errors, status announcements, colour contrast, and reduced motion. Use an approximately 44 px comfortable design target for primary controls; do not misstate that design choice as the exact minimum for every WCAG AA target.

Verify 320 CSS px reflow, 200% text zoom, long Arabic strings, mixed Arabic/Latin addresses, small mobile widths, tablet, and wide desktop. Images and the authentic logo must not be stretched or mirrored. The full counter must remain visible at the selected mobile crop. Motion must not be required to discover content.

Performance targets follow current Core Web Vitals guidance: LCP at or below 2.5 seconds, INP at or below 200 ms, CLS at or below 0.1, assessed at the 75th percentile of real visits when field data becomes available. Use repeatable laboratory checks during development, state device/network conditions, and do not present lab results as field INP or guaranteed production scores.

Run meaningful checks for the new risks:

- Every declared route resolves; expected missing routes return 404.
- Arabic/English pairs, canonicals, sitemap, breadcrumbs, and language switches agree.
- All ten service entries, all eleven concepts, and all five package names are present without omissions or duplicates.
- Links, CTAs, preselected enquiry values, and download targets work.
- Contact validation, server failures, duplicate prevention, fixed-recipient enforcement, and status messaging behave correctly.
- Images and fonts load without broken requests, and the browser console has no material errors.
- Repeated templates work in Arabic and English on mobile and desktop; inspect every page for content and overflow, and representative template pages in detail.
- No invented project claims, unresolved placeholders, production secrets, old slogans, or misleading coming-soon notices remain in the release candidate.

Preserve useful existing tests. Add tests for changed behaviour rather than writing assertions that merely duplicate static text. Report actual results and remaining limitations. Do not claim email delivery, accessibility compliance, source synchronisation, or deployment unless verified.

## 14. Work sequence and required handoff

Work through these stages without stopping for routine choices:

1. **Inspect and reconcile:** current source, brand guide, profile, assets, routes, enquiry backend, deployment path, and factual gaps. Produce a short assumptions record.
2. **Content and architecture:** final page inventory, bilingual navigation, service/concept relationship map, metadata, exact catalogue coverage, and full page copy.
3. **Design system and home page:** implement responsive tokens, authentic logo, hero, decision routes, and representative artwork. Check Arabic and English before multiplying templates.
4. **Detail templates:** complete one service page and one concept page, including the villa page treatment. Verify their differences, then populate all ten services and eleven concepts with distinct content.
5. **Core pages and contact:** finish Approach, About, Engagements, Deliverables, Contact, and factual Privacy content. Complete links, states, and SEO.
6. **Preview and QA:** build the complete release candidate, inspect mobile/desktop RTL/LTR, run the meaningful checks, resolve defects, and provide a reviewable preview.
7. **Production, only when authorised:** release the reviewed version through the established workflow; verify the exact deployment and report any account-side configuration blocker accurately. Do not alter domains or claim success to bypass a failed gate.

Provide a concise handoff with:

- A preview link, or a clearly identified local preview if remote preview is unavailable.
- Complete source changes in an isolated branch/draft review where available, without triggering an unapproved production deployment.
- A page inventory with Arabic/English route pairs and readiness status.
- A bilingual copy document with navigation, page copy, metadata, alt text, form fields, and all interaction states.
- An asset manifest recording approved originals, licences/generation status, crops, and usage.
- A short design rationale showing how each benchmark influenced a specific decision within NASAQ’s identity.
- A QA report distinguishing tested, passed, unresolved, and environment-dependent items.
- Any exact remaining production approval or configuration action, after the reviewable work is complete.

Do not end with a generic proposal when implementation has been requested. Deliver the functioning preview and identify only genuine missing dependencies. Do not substitute a static mockup for working routes and forms.

## Appendix A. Canonical services and approved output statements

Use these names and output meanings without expanding the scope. The numbered IDs below organise the content model; they do not require prominent numbering in the design.

### S01. وضوح ما قبل التعاقد / Pre-contract clarity

Route: `/{lang}/services/pre-contract-clarity/`

- وضوح النطاق قبل مخاطبة الموردين / Scope clarity before supplier engagement
- قراءة مبكرة للمخاطر والميزانية / Early risk and budget review
- دعم القرار قبل الالتزام / Decision support before commitment

### S02. دعم الجدوى الأولية / Feasibility support

Route: `/{lang}/services/feasibility-support/`

- تقييم ملاءمة الفكرة والافتراضات الأولية / Concept fit and initial assumptions
- تصوّر أولي للمعدات ومتطلبات المرافق / Preliminary equipment and MEP overview
- توجيه عملي لقرار الاستثمار / Practical guidance for the investment decision

### S03. مواءمة قائمة الطعام والمساحة / Menu and space validation

Route: `/{lang}/services/menu-space-validation/`

- فحص ملاءمة قائمة الطعام للمساحة / Menu-to-space fit assessment
- مراجعة حركة التشغيل / Operational movement review
- تقييم السعة وتدفق الخدمة / Capacity and service flow assessment

### S04. مقارنة عروض الموردين / Supplier offer comparison

Route: `/{lang}/services/supplier-offer-comparison/`

- مقارنة العروض بما يتجاوز السعر / Offer comparison beyond price
- كشف الاستثناءات وفروقات المواصفات / Exceptions and specification gaps
- مصفوفة قرار تدعم المالك / A decision matrix for the owner

### S05. تخطيط المعدات / Equipment planning

Route: `/{lang}/services/equipment-planning/`

- قائمة معدات مرتبطة بقائمة الطعام / Equipment list aligned with the menu
- منطق واضح لتوزيع المعدات والحركة / Equipment placement and circulation logic
- فحص السعة والحيّز ومتطلبات المرافق / Capacity, footprint and utility checks

### S06. متطلبات الأعمال الكهروميكانيكية / MEP requirements

Route: `/{lang}/services/mep-requirements/`

- متطلبات الكهرباء والمياه والصرف والغاز والتهوية / Electrical, water, drainage, gas and ventilation
- جدول مبدئي لمتطلبات المرافق / Preliminary utility schedule
- مدخلات التنسيق قبل التنفيذ / Coordination inputs before execution

### S07. نطاق أعمال الاستانلس ستيل / Stainless steel scope

Route: `/{lang}/services/stainless-steel-scope/`

- نطاق تصنيع واضح وقابل للتسعير / A fabrication scope that suppliers can price
- كاونترات وأحواض ورفوف وعناصر خاصة / Counters, sinks, shelves and custom items
- أساس واضح لجدول كميات الاستانلس ستيل / Clear basis for the stainless steel BOQ

### S08. تقدير التكلفة الرأسمالية / CAPEX estimate

Route: `/{lang}/services/capex-estimate/`

- نطاقات ميزانية تقديرية غير نهائية / Indicative budget ranges, subject to refinement
- منطق التكلفة بحسب فئات النطاق / Cost basis by scope category
- رؤية استثمارية قبل اختيار المورد / Investment view before supplier selection

### S09. دعم المشاريع الخاصة / Confidential project support

Route: `/{lang}/services/confidential-project-support/`

- دراسات مبكرة مع الحفاظ على السرية / Confidential early-stage studies
- حماية معلومات المفاهيم ومشاريع القصور / Protected concept and palace project information
- حصر مشاركة التفاصيل الضرورية مع الموردين / Only necessary details shared with suppliers

### S10. استشارات المطبخ من طرف المالك / Client-side kitchen advisory

Route: `/{lang}/services/client-side-kitchen-advisory/`

- استشارة مستقلة قبل الشراء / Independent advice before purchase
- وضوح النطاق والقرار من طرف المالك / Scope and decision clarity for the owner
- دون بيع أو انحياز تنفيذي / No selling or execution bias

## Appendix B. Canonical concepts and distinct page angles

Concept names are source-based. The operational questions below are proposed editorial starting points to validate against the complete profile and actual service scope; they are not engineering specifications or guaranteed package inclusions.

| ID | العربية | English | Route after `/{lang}/concepts/` | Proposed page emphasis |
|---|---|---|---|---|
| C01 | قهوة مختصة ومخبز فاخر | Specialty coffee and bakery café | `specialty-coffee-bakery/` | Coffee preparation, bakery production/display, peak handover, and work behind the counter. |
| C02 | برجر فاخر ودجاج مقلي ووجبات سريعة | Premium burger / fried chicken QSR | `burger-fried-chicken-qsr/` | Preparation, cooking, assembly, packing, and order collection at busy periods. |
| C03 | مفهوم الشاورما | Shawarma concept | `shawarma/` | Preparation, cooking/holding assumptions, assembly, and service-counter relationships. |
| C04 | أطباق صحية وسلطات ووجبات بروتين | Healthy bowls, salads and protein meals | `healthy-bowls-salads-protein/` | Ingredient preparation, holding, portioning, assembly, and pickup. |
| C05 | مطبخ سحابي متعدد العلامات | Multi-brand cloud kitchen | `multi-brand-cloud-kitchen/` | Shared versus distinct production needs, packing, dispatch, and capacity assumptions. |
| C06 | مطاعم الكاجوال العالمية | International casual dining | `international-casual-dining/` | Several menu stations, coordination at the pass, and front/back-of-house relationships. |
| C07 | إفطار وبرانش طوال اليوم | All-day breakfast and brunch | `all-day-breakfast-brunch/` | Hot/cold stations, drinks, changing demand through the day, and service coordination. |
| C08 | مخبز وباتيسري ومتجر حلويات | Bakery, patisserie and dessert shop | `bakery-patisserie-dessert/` | Production stages, cooling/finishing, storage, display, and collection. |
| C09 | مطبخ مركزي | Central kitchen | `central-kitchen/` | Receiving, storage, batch production, packing, dispatch, and utility coordination. |
| C10 | قاعة طعام متعددة المفاهيم | Multi-concept food hall | `multi-concept-food-hall/` | Shared infrastructure, unit boundaries, back-of-house circulation, and handover points. |
| C11 | مطبخ خدمة للفلل والقصور | Service kitchen for villas and palaces | `villas-palaces-service-kitchen/` | Daily service, hospitality occasions, discreet staff movement, storage, and architectural integration. |

# END MASTER PROMPT

---

## Research and implementation references

All web sources below were accessed on 26 September 2026. Benchmark claims remain the publishers’ claims. This review did not verify their project statistics, professional credentials, or business results.

1. NASAQ, `NASAQ_design-system_v2.0_Profile_Final.md`: design rules, canonical wording, five packages, eleven concepts, and ten services. User-supplied source; original file unchanged.
2. NASAQ, `NASAQ_Company_Profile_COMPLETE_MD2.0.md`: company positioning, scope, concepts, and potential deliverables. Companion profile reviewed for this brief.
3. [AYEN official report and service explanation](https://blogs.ayen.com.sa/تقرير-فحص-العقارات-من-عاين/): service explanation, report features, booking FAQs, and named package links. Used because direct homepage visual access was blocked by security verification.
4. [MCTS home](https://www.mctservices.com/), [commercial kitchen service](https://www.mctservices.com/services/commercial-kitchen-design/), and [sample project presentation](https://www.mctservices.com/portfolio-item/the-emerald-palace-kempinski-hotel/): reviewed for service depth, imagery, and scope presentation. Home desktop visual inspected; no exhaustive mobile or accessibility audit claimed.
5. [GGB Consulting home](https://ggb.consulting/): reviewed for situation-based entry routes, deliverable explanations, and imagery/evidence labels. Home desktop visual inspected; no exhaustive mobile or accessibility audit claimed.
6. [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/): source for the proposed accessibility target. A development target is not certification.
7. [Google Web Vitals](https://web.dev/articles/vitals): source for LCP, INP, CLS, and 75th-percentile field measurement targets.
8. [Google Search Central: localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions): source for reciprocal localized-page annotations.

The sitemap, module order, navigation groupings, art prompts, page-length guidance, asset budgets, form refinements, and concept editorial questions are recommendations created for NASAQ. They are not statements taken from competitors or pre-existing commercial commitments.


## Approved follow-up: service visuals and homepage enquiry, 27 September 2026

- Remove illustrative sample-output tables and their example captions from all service detail pages. Retain the actual service outputs and scope.
- Add a meaningful expressive image to every secondary page. Use the original advisory, coordination and stainless-steel materials artwork alongside existing relevant images. Label conceptual imagery and provide bilingual alt descriptions.
- Place the full enquiry form as the final homepage section in both languages. Route project-discussion CTAs to the homepage contact anchor while carrying selected service, concept and project type.
- Preserve existing contact URLs with a clear route to the homepage form. Preserve current hosting, audience and server-side delivery behavior.


## Approved follow-up: unique imagery and clearer deliverables, 28 September 2026

- Give each of the 29 secondary pages its own distinct bright image. Use original full-scale architectural, hospitality and material imagery, never the rejected miniature-counter-on-desk composition. Arabic and English equivalents share the same page image. Homepage photographs are exclusive to the homepage.
- Remove every sample document and HTML table from the deliverables page. Present actual deliverable names and descriptions in an editorial layout, and use a matching descriptive introduction on the homepage.
- Show “ناقش النطاق المناسب / Discuss the appropriate scope” once as a shared action after all five engagement packages.
- Preserve the homepage enquiry form, brand, routing and current hosting audience.


## Approved follow-up: homepage concepts teaser, 28 September 2026

- Remove the visible captions “صورة تعبيرية / Concept image” from every page, retaining descriptive bilingual alt text. This supersedes earlier instructions to label conceptual images visibly.
- Add exactly one new, unique photograph in the homepage concepts section to introduce the nine concepts beyond the existing coffee and villa features. Include concise links to their dedicated pages.
- Publish all current Arabic and English pages to the existing Site and its active nasaqfb.com domain, preserving the current access configuration.


## Approved simplification: homepage concepts image, 28 September 2026

Replace only the homepage concepts teaser with one much simpler image. Use a clean counter, three separated food items suggesting distinct concepts, a quiet white background and a restrained teal accent. Avoid panoramic restaurants, many pieces of equipment, busy decoration, people or text. Preserve the existing concept links and caption-free presentation.
