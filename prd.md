# PRD – Project Detail Pages

## 1. Overview
- **Owner**: Sharad Jain
- **Author**: GPT-5 Codex (consulting partner)
- **Status**: Draft (Week 45, 2025)
- **Goal**: Elevate `resume.sharadja.in` from a single-page résumé to a narrative portfolio with deep case studies for top-tier clients.

## 2. Problem & Opportunity
- Current experience limits each project to a short blurb; lacks depth for executive or technical decision makers.
- High-caliber clients expect evidence of end-to-end ownership, metrics, and differentiated craftsmanship.
- Opportunity to deliver immersive case studies aligned with existing design system (Next.js App Router + shadcn/ui).

## 3. Target Audience & Jobs-To-Be-Done
- **Primary**: CTOs, Heads of Data/AI, Principals at elite firms evaluating Sharad for consulting or leadership roles.
- **Secondary**: Recruiters screening for senior AI positions.
- **JTBD**:
  - Understand impact quickly (`hero`, `results`).
  - Dive into technical depth when needed (`technical details`, `architecture`).
  - Validate credibility (`role`, `timeline`, testimonials, links).
  - Assess fit for their problem space (`related projects`, tech stack).

## 4. Success Metrics (North Star)
- **Engagement**: +40% increase in average time-on-site for project visitors within 30 days.
- **Conversion**: +20% increase in contact form initiations from project paths.
- **Perception**: Qualitative feedback from at least 3 high-touch leads citing case studies as differentiator.

## 5. Product Requirements

### 5.1 Content Source of Truth (Best-Case Selected)
- **Decision**: **MDX per project** for rich storytelling, reusable components, and developer-friendly authoring.
- **Structure**:
  - `src/content/projects/<slug>/index.mdx` – primary narrative with MDX frontmatter (metadata) and body.
  - Co-locate images under `src/content/projects/<slug>/media/*`; basic `<img>` acceptable for now.
  - **Frontmatter schema (lean)**:
    ```yaml
    title: string
    slug?: string (defaults to folder name)
    summary: string
    techStack: string[]
    role?: string
    timeframe?: string
    githubUrl?: string
    liveUrl?: string
    heroImage?: { src: string; alt: string }
    ```
    - **Body guidelines**: plain markdown sections first; helper MDX components are a future enhancement.

### 5.2 Routing & Rendering
  - Dynamic route: `src/app/projects/[slug]/page.tsx` with static generation (`generateStaticParams`).
  - Parent listing at `src/app/projects/page.tsx` can wait.
  - 404 handling: if slug missing, fall back to existing not-found UI.
  - Metadata: use title + summary for head tags; skip custom OG assets.

### 5.3 UI/UX Requirements
  - **Hero**: breadcrumb (Home › Projects › Title), title, optional role/timeframe line, tech stack badges, CTA buttons when URLs exist.
  - **Minimum sections**:
    1. Overview (problem + solution summary).
    2. Technical Details (architecture/approach highlights).
    3. Results (key outcomes; metrics optional).
    4. Gallery (simple responsive grid; lightbox later).
  - **Design language**: reuse existing shadcn `Section`, `Card`, `Badge`, `Button`, `Breadcrumb`; keep `max-w-4xl` layout.
  - **Accessibility**: ensure alt text, maintain existing color/typography tokens.
  - **Responsive**: follow current page spacing; hero CTAs stack on mobile.

### 5.4 Data & Component Changes
  - Extend `Project` type in `src/data/resume-data.tsx` with `slug`, `summary`, optional `role`, `timeframe`, `highlightMetric`.
  - Add minimal `getAllProjects` helper to read MDX frontmatter; skip caching/derived metadata for now.
  - Update `ProjectCard` to link to `/projects/[slug]` and expose summary + highlight metric when present.

### 5.5 Content Lifecycle
- MDX authoring workflow: create folder, add frontmatter + markdown, import images manually.
- Draft projects can be kept locally; no special visibility flag required yet.
- Deploy using existing `next build`; no extra scripts.

### 5.6 Non-Goals
- Analytics event tracking or scroll-depth instrumentation.
- Automated MDX lint/validation pipeline.
- Private/NDA gating flows beyond basic content omission.
- No CMS integration in this iteration.
- No user comments or interactive demos.
- No multilingual support.

## 6. Technical Approach
- **MDX Integration**: configure `@next/mdx` with minimal remark plugins (markdown + GitHub tables) and export helper to load frontmatter.
- **Image Handling**: prefer `next/image`, but allow plain `<img>` until assets are normalized.
- **Type Safety**: hand-rolled TypeScript interfaces with runtime fallback checks; zod validation optional later.
- **Testing**: rely on manual QA for first iteration; automated tests are a follow-up task.

## 7. Risks & Mitigations
- **Content Drift**: rely on frontmatter checklist and manual review; add automated validation later if needed.
- **Build Time**: minimal (≤10 projects). If grows, consider ISR.
- **Asset Weight**: encourage optimized images; formal limits postponed.
- **Sensitive Info**: manually redact or omit NDA material before publishing; introduce visibility flags later if required.

## 8. Milestones
1. **Content Infrastructure (Day 1-2)**
   - Configure MDX support and lightweight frontmatter loader.
   - Migrate one project as pilot (`eco-home-energy-advisor`).
2. **UI Implementation (Day 2-3)**
   - Build dynamic route, hero, sections, gallery.
   - Update index cards and navigation.
3. **Polish (Day 3-4)**
   - Add testimonial/metrics modules where content exists.
   - Manual QA, copy-edit.
4. **Launch (Day 5)**
   - Deploy via Vercel.

## 9. Open Questions
- Should private projects be discoverable via password-protected links instead of being omitted? (Future iteration.)
- Any requirement for downloadable PDF case studies? (Not in scope now.)

## 10. Approval Checklist
- [ ] MDX content pipeline merged
 - [ ] First project detail page live with approved copy and media
- [ ] Project index updated with deep-link CTAs
- [ ] Stakeholder sign-off (Sharad)
