# Portfolio

Personal portfolio site for Justin Chan, built with Next.js 15, React 19,
TypeScript, and Tailwind CSS v4. The app uses the App Router and is configured
for static export through `next.config.mjs`, so `npm run build` emits the
publishable site to `out/`.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

On Windows PowerShell, prefer the `.cmd` entrypoints if script execution policy
blocks the npm wrappers:

```powershell
npm.cmd run dev
npm.cmd run build
npx.cmd tsc --noEmit --incremental false
```

## Current Site

- Home page with terminal/manual styling, selected work, status panels, and
  current availability.
- Sitewide command palette in `components/CommandPalette.tsx`.
- About, Resume, Projects, and dynamic Project detail routes.
- Project content centralized in `lib/projects.ts`.
- Static resume download at `public/resume.pdf`.
- Static project media and writeups under `public/projects/`.

## Structure

```text
app/
  layout.tsx              Root layout, metadata, nav, footer, command palette
  page.tsx                Home page
  about/page.tsx          Biography, stack, education, contact
  resume/page.tsx         In-site resume content and PDF download
  projects/
    page.tsx              Project grid
    [slug]/page.tsx       Project detail pages
components/               Reusable UI components
lib/projects.ts           Project data, media, and detailed specs
public/
  resume.pdf              Downloadable resume
  projects/               Project images, PDFs, and markdown writeups
```

## Editing Content

1. Update home page copy and status panels in `app/page.tsx`.
2. Update biography and contact details in `app/about/page.tsx`.
3. Update the in-site resume in `app/resume/page.tsx`.
4. Add or edit projects in `lib/projects.ts`.
5. Place project assets in `public/projects/<slug>/` and reference them as
   `/projects/<slug>/file.ext`.
6. Replace the downloadable resume at `public/resume.pdf`.
7. Adjust theme variables and global styling in `app/globals.css`.

## Media

Project media entries live in each project's `media` array:

```ts
{ type: "image", src: "/projects/my-project/cover.jpg", alt: "Project cover" }
```

Video entries can include a poster:

```ts
{ type: "video", src: "/projects/my-project/demo.mp4", poster: "/projects/my-project/cover.jpg", alt: "Project demo" }
```

Use browser-friendly formats such as JPG/PNG/WebP for images and MP4 (H.264) for
video.

## Validation

```powershell
npx.cmd tsc --noEmit --incremental false
npm.cmd run build
```

`npm run build` runs `next build` and writes the static export to `out/`.

## Deployment

The site is already configured for static export:

1. Run `npm.cmd run build`.
2. Publish the generated `out/` directory to GitHub Pages, S3, nginx, or any
   static host.

For a local production preview of the exported files, serve the `out/` directory
with any static file server.

## Tech

- [Next.js 15](https://nextjs.org) with App Router
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)
