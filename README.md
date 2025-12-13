# Lisi Portfolio

A modern portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Modern Design**: Clean and responsive layout with dark mode support
- **Navigation**: Fixed navigation bar with smooth transitions
- **Language Toggle**: EN/CN language switcher (UI ready, functionality can be extended)
- **Project Showcase**: Display projects with technology tags
- **Multiple Pages**: Home, Projects, About, Resume, and Contact pages
- **Social Links**: Footer with social media links

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
│   ├── resume/         # Resume page
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/
│   ├── Footer.tsx      # Footer component
│   ├── Navigation.tsx  # Navigation bar
│   └── ProjectCard.tsx # Project card component
└── data/
    └── projects.json   # Project data
```

## Build for Production

```bash
npm run build
npm start
```

## Customization

- Update project data in `data/projects.json`
- Modify styling in `app/globals.css` and component files
- Add your content to the About, Resume, and Contact pages
- Update social media links in `components/Footer.tsx`

