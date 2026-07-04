# YSquared Services Landing Page

Production-ready marketing site scaffold for `YSquared Refrigeration & Airconditioning Services`.

## Stack

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Framer Motion
- Lucide React
- React Hook Form + Zod

## Run

```powershell
npm.cmd install
npm.cmd run dev
```

## Deploy To Vercel

1. Push the project to GitHub, GitLab, or Bitbucket.
2. In Vercel, click `Add New... > Project`, import the repository, and keep the framework preset as `Next.js`.
3. Leave the build command as `next build` and output settings on Vercel defaults.
4. Confirm the configured production domain matches `siteConfig.url`.

Recommended pre-deploy check:

```powershell
npm.cmd run lint
npm.cmd run build
```

## Structure

```text
src/
  app/
    layout.tsx
    page.tsx
    robots.ts
    sitemap.ts
  components/
    Navbar.tsx
    Hero.tsx
    Services.tsx
    WhyChooseUs.tsx
    Gallery.tsx
    Pricing.tsx
    Areas.tsx
    Testimonials.tsx
    FAQ.tsx
    ContactForm.tsx
    Footer.tsx
    CTAButton.tsx
    SectionTitle.tsx
    FloatingContactButtons.tsx
    JsonLd.tsx
    AnimatedCounter.tsx
    motion/Reveal.tsx
    ui/
  lib/
    content.ts
    site.ts
public/
  assets/
    images/
```

## Replaceable Assets

Brand visuals live in:

```text
public/assets/images
```

## Integration-Ready Notes

This project is intentionally structured so these can be added without major refactors:

- Messenger Chat: replace `messengerUrl` in `src/lib/site.ts` and mount widget in `layout.tsx`
- WhatsApp: add a new floating action button alongside Messenger and Call
- Google Analytics / Meta Pixel: inject scripts in `layout.tsx`
- Google Maps: replace `areas-map.svg` with embed or map component in `Areas.tsx`
- Calendly: swap contact CTA or add modal launcher in `ContactForm.tsx`
- Email notifications / n8n webhook / CRM: wire the `onSubmit` handler in `ContactForm.tsx`

## SEO

- Metadata in `src/app/layout.tsx`
- `robots.ts`
- `sitemap.ts`
- Local Business JSON-LD via `src/components/JsonLd.tsx`
