# PRD — Jayganesh Lavange | SQL Server DBA Portfolio

## Original Problem Statement
Create a portfolio that attracts recruiters and drives them to the LinkedIn profile.
Follow-up: premium, award-worthy portfolio for a Microsoft SQL Server DBA (Jayganesh Lavange, 4+ yrs, Clover Infotech). Dark azure/navy theme, glassmorphism, animations, theme toggle, contact form, SEO.

## Stack
React (CRA + CRACO) + FastAPI + MongoDB. Motion via framer-motion + lenis smooth scroll. (Note: Next.js/Vercel from the brief not applicable — platform uses React+FastAPI+Mongo.)

## User Persona
Recruiters / hiring managers from top tech companies evaluating a senior SQL Server DBA. Primary conversion goal = click through to LinkedIn.

## Architecture
- Frontend single-page portfolio in `/app/frontend/src`:
  - App.js (Lenis, theme, loading screen, section orchestration)
  - components: Chrome (Navbar/Footer/LoadingScreen/ScrollProgress), Background (SQL animated bg + cursor glow), Hero, Sections (About/Skills/Marquee/Experience), Showcase (Projects/Certifications/GitHub/Blog/Testimonials), Contact, primitives (Reveal/SectionHeading/MagneticButton/LinkedInCTA/StatCounter)
  - data.js — all editable content + downloadResume()
- Backend `/app/backend/server.py`: `/api/contact` POST+GET stored in Mongo `contact_messages`.

## Implemented (2026-07-19)
- Kinetic hero with masked line reveal, typewriter role, animated SQL/database background, parallax glows.
- About (animated stat counters), Skills (8 glass capability cards), editorial marquee, Experience timeline.
- Projects tetris grid with hover reveal + GitHub links, Certifications, GitHub repos, Blog, Testimonials.
- Prominent LinkedIn CTAs (nav, hero, experience, contact, footer).
- Working contact form -> MongoDB, sonner toasts.
- Dark/light theme toggle (persisted), scroll progress, back-to-top, SEO meta/OG tags.
- Tested: backend 100%, frontend 100% (iteration_1.json).

## Backlog / Next
- P1: Replace placeholder email/phone/LinkedIn/GitHub with real values (in data.js).
- P1: Add a real PDF resume in /public and link it (currently generated .txt blob).
- P2: Spam protection (honeypot/rate limit) on /api/contact; email notification via Resend.
- P2: Inline field-level validation; admin view for received messages.
- P2: Migrate FastAPI on_event -> lifespan handlers.
