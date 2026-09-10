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
Run `npm run build`, then deploy the `dist` folder to Vercel, Netlify, GitHub Pages, or another static host.
