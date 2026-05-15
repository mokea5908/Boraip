# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server on port 3000
npm run build     # Clean + production build (outputs to dist/)
npm run preview   # Preview production build locally
npm run lint      # TypeScript type checking (tsc --noEmit)
npm run clean     # Remove dist/
```

No test suite exists in this project.

## Environment

Copy `.env.example` to `.env` and set:
- `GEMINI_API_KEY` — required for Gemini AI features
- `APP_URL` — deployment URL (used by AI Studio / Cloud Run)

## Architecture

Single-page React 19 + TypeScript app built with Vite 6. It is a **static frontend only** — no backend, no API routes. Gemini API calls (`@google/genai`) are made directly from the client.

**Stack:**
- **Styling:** Tailwind CSS v4 (Vite plugin, no tailwind.config.js) with custom brand tokens defined in `src/index.css` (`--color-bora-primary`, `--color-bora-accent`, `--color-bora-light`)
- **Animation:** `motion` (Framer Motion fork) for scroll-triggered parallax and entrance animations; Three.js + `@react-three/fiber` + `@react-three/drei` for 3D particle/logo effects
- **Icons:** `lucide-react`
- **Path alias:** `@/` maps to `src/`

**App structure:**

`src/App.tsx` composes the single scrollable page from section components in order:
`Navigation → Hero → Experience → WhyBora → Vision → BizModel → Services → Clients → Footer`

All content data (practitioner bios, service descriptions, values, vision steps) lives in `src/constants.ts`. Edit content there, not inside components.

**3D components** (`ThreeBackground.tsx`, `ThreeLogo.tsx`, `InteractiveBackground.tsx`) use `<Canvas>` from `@react-three/fiber`. They are used in `Hero` and potentially `Navigation`.

**State:** Minimal — only local `useState` for toggling service card expansion in `Services.tsx`. No global state library.

**Responsive breakpoints:** Mobile-first with `md:` and `lg:` Tailwind prefixes. Mobile navigation uses a hamburger menu in `Navigation.tsx`.

## Deployment

Designed for Google AI Studio / Cloud Run deployment. The `APP_URL` env var is injected as the service URL; secrets are managed via AI Studio UI.
