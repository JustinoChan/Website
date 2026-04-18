# Portfolio

A modern personal portfolio built with **Next.js 15**, **TypeScript**, and **Tailwind CSS v4**. Includes a hero landing page, About, Resume, and Projects sections with image/video gallery support.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

```
app/
  layout.tsx           Root layout (nav + footer)
  page.tsx             Home / hero
  about/page.tsx       About me
  resume/page.tsx      Experience & education
  projects/
    page.tsx           Project grid
    [slug]/page.tsx    Project detail with media gallery
components/            Reusable UI (Nav, Footer, ProjectCard, ...)
lib/projects.ts        Project data — edit this to add your projects
public/                Static assets (images, videos, resume.pdf)
  projects/            Project media — drop screenshots/demos here
```

## Customizing

1. **Your name & meta** — search `Your Name` and `you@example.com` across the project and replace.
2. **Projects** — edit [lib/projects.ts](lib/projects.ts). Drop screenshots/videos into `public/projects/<slug>/` and reference them as `/projects/<slug>/file.png`.
3. **Resume PDF** — drop your file at `public/resume.pdf`. The download button on the Resume page links to it.
4. **Social links** — update [components/Footer.tsx](components/Footer.tsx) and [app/about/page.tsx](app/about/page.tsx).
5. **Colors** — tweak the CSS variables in [app/globals.css](app/globals.css) under `@theme`.

## Adding videos to a project

In `lib/projects.ts`, add an entry to a project's `media` array:

```ts
{ type: "video", src: "/projects/my-app/demo.mp4", poster: "/projects/my-app/cover.png", alt: "Demo" }
```

Place the file at `public/projects/my-app/demo.mp4`. MP4 (H.264) is the safest format for browser playback.

## Deployment

The site builds to a Node app by default and can also be exported as fully static files.

### Option A — Vercel (easiest)

1. Push this repo to GitHub.
2. Import the repo at https://vercel.com/new.
3. Vercel auto-detects Next.js — no config needed. Done.

### Option B — Netlify

1. Push to GitHub, then "Add new site → Import an existing project" on Netlify.
2. Build command: `npm run build` · Publish directory: `.next` (Netlify's Next.js plugin handles the rest).

### Option C — Static export (GitHub Pages, S3, nginx, any static host)

1. Open [next.config.mjs](next.config.mjs) and uncomment `output: 'export'` and set `images.unoptimized: true`.
2. Run `npm run build`. The static site is emitted to `out/`.
3. Upload `out/` to any static host. For nginx, just point `root` at the directory.

### Option D — Self-hosted Node server (VPS, Docker, etc.)

```bash
npm install
npm run build
npm start         # serves on port 3000
```

Put nginx/Caddy in front for HTTPS. Minimal Dockerfile:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Tech

- [Next.js 15](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)
