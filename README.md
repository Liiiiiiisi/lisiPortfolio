# Lisi Portfolio

A modern portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Modern Design**: Clean and responsive layout with dark mode support
- **Navigation**: Fixed navigation bar with smooth transitions
- **Language Toggle**: EN/CN language switcher (UI ready, functionality can be extended)
- **Project Showcase**: Display projects with markdown-driven content
- **Multiple Pages**: Home, Projects, About, Resume, and Contact pages
- **Social Links**: Footer with social media links
- **Dynamic Projects**: Markdown-based project pages with placeholder components

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
│   ├── project/        # Projects listing page
│   ├── projects/       # Dynamic project pages
│   ├── resume/         # Resume page
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/
│   ├── Footer.tsx      # Footer component
│   ├── Navigation.tsx  # Navigation bar
│   ├── MarkdownRenderer.tsx # Markdown parser
│   └── project/        # Project-specific components
├── lib/
│   └── projects.ts     # Project data utilities
└── public/
    └── projects/       # Project content (markdown, images, videos)
```

## Adding New Projects

1. Create a new directory in `public/projects/[project-id]/`
2. Add project structure:
   - `images/` - Project images
   - `videos/` - Project videos
   - `texts/data.json` - Project metadata
   - `texts/page.md` - Markdown content
3. Register the project in `public/projects/index.json`

See the project template guide for detailed instructions.

## Build for Production

```bash
npm run build
npm start
```

## Deployment

This project is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel for automatic deployments.

## Customization

- Update project data in `public/projects/index.json`
- Modify styling in `app/globals.css` and component files
- Add your content to the About, Resume, and Contact pages
- Update social media links in `components/Footer.tsx`
