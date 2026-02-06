# tayzhang-webapp

Next.js frontend for tayzhang-app personal website.

## Tech Stack

- Next.js 15 (App Router)
- React 19
- Tailwind CSS
- TypeScript

## Project Structure

```
tayzhang-webapp/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout with Header/Footer
│   │   ├── page.tsx             # Home page with featured posts
│   │   ├── about/
│   │   │   └── page.tsx         # About + Now section
│   │   ├── writing/
│   │   │   ├── page.tsx         # Writing index
│   │   │   ├── WritingClient.tsx # Client-side search/filter
│   │   │   └── [slug]/page.tsx  # Post page with related posts
│   │   └── showcase/
│   │       └── page.tsx         # App showcase (future)
│   ├── components/
│   │   ├── Header.tsx           # Navigation + GitHub/LinkedIn icons
│   │   ├── Footer.tsx           # Footer with nav and social links
│   │   └── PostCard.tsx         # Post card with reading time
│   ├── lib/
│   │   └── api.ts               # Backend API client
│   └── styles/
│       └── globals.css          # Tailwind + global styles
├── Dockerfile
├── next.config.js
└── tailwind.config.js
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home - positioning statement, featured posts, follow links |
| `/writing` | Writing index - search, tag filter, post list |
| `/writing/[slug]` | Post page - content, related posts, follow CTA |
| `/about` | About + Now section with social links |

## Features

- **Client-side search**: Real-time filtering by title, description, content
- **Tag filtering**: Filter posts by tag via URL query params
- **Related posts**: Display posts with shared tags on post detail page
- **Reading time**: Display estimated reading time on post cards
- **Social links**: GitHub and LinkedIn in header and footer
- **Responsive design**: Mobile-friendly with Tailwind CSS

## Development

```bash
# Run with Docker (recommended)
docker compose -f docker-compose.yml -f docker-compose.dev.yml up

# Or run standalone
npm install
npm run dev
```

## Git Workflow

Branch naming conventions:
- `feature/feat-xxx` - New features
- `fix/bug-xxx` - Bug fixes
- `chore/xxx` - Maintenance

## Access

| URL | Description |
|-----|-------------|
| http://localhost:3000 | Frontend |
| http://localhost:8000/api/ | Backend API |
| http://localhost:8000/docs | API documentation |
