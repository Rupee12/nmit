# NMIT MCA Teachers' Day 2026

Premium interactive Teachers' Day invitation website.

## Run
```bash
npm install
npm run dev
```

## Customize
- Event date/time/venue: `src/data/event.js`
- Faculty names/photos/messages: `src/data/faculty.js`
- Appreciation quotes: `src/data/messages.js`
- Gallery images: `src/data/messages.js`
- Optional music: add `public/audio/teachers-day.mp3`
- OG preview: `public/og-preview.svg`

## Personalized links
`?name=Rupesh&type=student`
`?name=ProfessorName&type=teacher`

## Deploy
This project uses the Vercel `api/appreciations.js` serverless function and Neon Postgres for the shared appreciation wall. In Vercel:

1. Create a Neon Postgres database through the Vercel Marketplace and connect it to this project.
2. Confirm the production environment has the secret `DATABASE_URL` variable from the Neon integration.
3. Deploy the project. The API creates the `appreciations` table automatically on its first request.

The database URL is server-only and is never exposed through Vite client environment variables.
