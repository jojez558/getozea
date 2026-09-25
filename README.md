# George's Portfolio — Full Project

A personal portfolio site with a separated frontend and backend.

```
project/
├── frontend/          static site — plain HTML/CSS/JS, no build step
│   ├── index.html
│   ├── css/styles.css
│   └── js/main.js
├── backend/           Express API for the contact form
│   ├── server.js
│   ├── routes/contact.js
│   ├── data/messages.json   (contact submissions get stored here)
│   └── package.json
└── README.md
```

## Running the frontend

The frontend is plain static files — no build tools needed.

- Easiest: double-click `frontend/index.html` to open it in a browser.
- Or serve it properly (recommended, so the contact form's `fetch` calls work
  without any browser file:// restrictions):
  ```bash
  cd frontend
  npx serve .
  ```
  This will usually serve it at `http://localhost:3000`.

## Running the backend

The backend is a small Express API that only handles the contact form
(saves messages to `backend/data/messages.json` — no database setup needed).

```bash
cd backend
npm install
npm start
```

This starts the API at `http://localhost:3001`.

- `POST /api/contact` — submit a message (used by the contact form)
- `GET /api/contact` — view all submitted messages
- `GET /api/health` — simple health check

## Connecting them

`frontend/js/main.js` points at `http://localhost:3001` by default. If you
deploy the backend somewhere else (e.g. Render, Railway, a VPS), update the
`API_BASE` constant in that file, or set `window.API_BASE_URL` before the
script loads.

## What's still a placeholder

- Portrait photo, MwauraTM media, gallery photos/videos, and certificate
  images — all marked with dashed boxes in the site, ready for your files.
- Contact details (email, phone, Telegram) in `index.html` and the CV tab.
- Social icon links in the floating icon bar (`index.html`, bottom of file)
  — currently point to `#`, swap in your real profile URLs.

## Next steps if you want to go further

- Swap `data/messages.json` for a real database (e.g. SQLite, Postgres) once
  submission volume grows.
- Add email notifications on new contact submissions (e.g. via Nodemailer).
- Deploy the frontend (Netlify, Vercel, GitHub Pages) and backend (Render,
  Railway, Fly.io) separately, as their names suggest.
# getozea
