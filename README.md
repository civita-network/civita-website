# CIVITA website

CIVITA is the Computational Infrastructure for Validation, Integration,
Testing, and Assessment. This project contains the public website foundation,
built with the Next.js App Router, TypeScript, and Tailwind CSS.

## Local development

Use Node.js 22.12 or later and npm. From this directory, run:

```sh
npm ci
npm run dev
```

Open [the local website](http://localhost:3000). Run `npm run lint` and
`npm run build` to check the project. Use `npm start` to serve a production build.

## Project layout

- `src/app/` contains Home, Explore, Contribute, Documentation, and About. The
  root layout provides the header, footer, and main content area.
- `src/app/globals.css` defines the CIVITA color tokens and content width.
- `src/components/` contains the navigation and reusable UI. Application cards
  can be placed in a responsive grid with `grid gap-6 md:grid-cols-2`.
- `src/config/site.ts` contains the brand, logo metadata, and navigation.
  The original CIVITA logo is at `public/images/civita-logo.png`.
- `src/config/applications.ts` lists the four initial applications. To activate
  an application, add its verified external URL and set its status to
  `available`.

## Deployment configuration

For a future Vercel deployment, select this directory as the project root and
use the Next.js framework preset. Set `SITE_URL` to the full production origin
if you want to override the Vercel production domain used for Open Graph image
URLs. Local builds default to `http://localhost:3000`.
