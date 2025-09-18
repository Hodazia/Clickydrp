
# ClickyDrop

One link for everything you share. Open-source, themeable, and social-first.


## Live Link

- App: https://clickydrp.vercel.app/

## What is this project?

ClickyDrop is an open-source Link-in-bio platform where creators can bundle all their links and socials into a single, beautiful page. It includes a rich dashboard to manage links, socials, and a powerful theme editor to customize the look-and-feel of your public page.

## Features

- Landing page with responsive marketing sections (Hero, Features, Dashboard preview, FAQ)
- Authenticated dashboard with sidebar navigation
- Links Manager
  - Add, edit, delete links
  - Optional thumbnails (upload)
- Socials Manager
  - Quick add/edit/delete support
  - 15+ popular platform icons with status badges
- Profile Management
  - Username, email, bio, avatar upload (Cloudinary-backed)
- Theme Editor (SaaS-like)
  - Background: color/gradient/image
  - Links styling: background, text color, radius, spacing, hover color
  - Text: bio font color, size, family
  - Socials: icon color, hover color, size
  - Profile: avatar shape and border
  - Live mobile preview 
- Dark/Light mode
  - Global ThemeToggle component (persists via localStorage)
  - Applied to landing pages and dashboard pages (Profile, Links, Theme)

## Tech Used

- Framework: Next.js (App Router)
- Language: TypeScript, React
- Styling: Tailwind CSS v4
- Animations: Framer Motion
- UI Library: ShadCn
- Icons: lucide-react
- Auth: NextAuth (with Prisma adapter)
- Database: PostgreSQL via Prisma ORM
- Storage: Cloudinary (for images)
- Toasts: sonner

## Local Development

1) Install dependencies
```bash
npm install
```

2) Set environment variables
- DATABASE_URL
- NEXTAUTH_SECRET
- NEXTAUTH_URL
- CLOUDINARY_* (if using uploads)

3) Run Prisma
```bash
npx prisma migrate deploy
npx prisma generate
```

4) Start the dev server
```bash
npm run dev
# open http://localhost:3000
```

## Project Structure (high-level)

- `app/` – Next.js routes (landing, dashboard, API routes)
- `components/` – Reusable UI components and feature modules (Theme Editor, Landing sections, etc.)
- `lib/` – Prisma client, auth helpers, utilities
- `prisma/` – Prisma schema and migrations
- `public/` – Static assets

## Notes

- Dark mode is controlled by adding/removing the `dark` class on `document.documentElement`. The ThemeToggle handles persistence (localStorage) and system preference.
- The theme editor is compatible with the current Prisma Theme schema (card background fields removed).

## Notion

- The below is a notion link to the page of how i implement this project!

[Notion Page](https://hospitable-page-c67.notion.site/v1-27262da32a8d804fa0cbcd51f72327e8)