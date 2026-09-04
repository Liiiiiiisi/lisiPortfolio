# Lisi Portfolio

A modern portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Modern Design**: Clean and responsive layout with dark mode support
- **Navigation**: Fixed navigation bar with smooth transitions
- **Language Toggle**: EN/CN language switcher (UI ready, functionality can be extended)
- **Project Showcase**: Seven catalog-driven case studies with dedicated implementations
- **Multiple Pages**: Home, Projects, About, Resume, and Contact pages
- **Social Links**: Footer with social media links
- **Project System**: Shared catalog, sequence navigation, Hero media, and reusable case-study components

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── app/
│   ├── about/          # About page
│   ├── contact/        # Contact page
│   ├── project/        # Legacy projects-listing alias
│   ├── projects/       # Canonical project routes
│   ├── resume/         # Resume page
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/
│   ├── Footer.tsx      # Footer component
│   ├── Navigation.tsx  # Navigation bar
│   ├── NextProjectTransition.tsx # Shared case-study transition
│   └── project/        # Project-specific components
├── data/
│   ├── projectCatalog.ts # Canonical project identity and ordering
│   ├── projectSequence.ts # Next-project sequence
│   └── projectHeroMedia.ts # Canonical Hero media
└── public/
    └── projects/       # Project documentation and web media
```

## Adding New Projects

1. Add the project's canonical identity to `data/projectCatalog.ts`.
2. Preserve ordering/navigation in `data/projectSequence.ts`.
3. Register canonical first-view media in `data/projectHeroMedia.ts`.
4. Add the dedicated or data-driven implementation under `components/project/` and `data/caseStudies/`.
5. Put optimized web media and current maintainer documentation in `public/projects/[physical-folder]/`.

## Build for Production

```bash
npm run build
npm start
```

## Deployment

This project is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel for automatic deployments.

## Customization

- Update canonical project data in `data/projectCatalog.ts`
- Modify styling in `app/globals.css` and component files
- Add your content to the About, Resume, and Contact pages
- Update social media links in `components/Footer.tsx`
