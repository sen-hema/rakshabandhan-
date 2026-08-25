# A Rakhi for Karishma

A private, password-gated Raksha Bandhan page. No photos anywhere — the
entire design (thread animation, certificate, icons) is hand-built in
CSS/SVG, across six pages you flip through like a greeting card.

## How the login works (security model)

The ID and password are **not** stored anywhere in this code. They live
only in Netlify's Environment Variables, checked server-side by
`netlify/functions/login.js`. The real password is never present in the
HTML, CSS, or JS shipped to the browser.

`.env` is listed in `.gitignore`, so it never gets committed — locally it
holds test credentials for development only; the real ones live in
Netlify's env var store, set directly via the CLI or dashboard.

## 1. Run it locally

```
npm install
```

Create a `.env` file (see `.env.example`) with test credentials:
```
APP_USERNAME=test
APP_PASSWORD=test123
```

```
npm run dev
```

Open the printed local URL and log in with the test credentials.

## 2. Deploy to Netlify (via the CLI, no GitHub needed)

```
npx netlify-cli login
npx netlify-cli init
```
Choose "Create & configure a new site" when prompted.

Set the real credentials directly in Netlify — never in a file:
```
npx netlify-cli env:set APP_USERNAME your-chosen-id
npx netlify-cli env:set APP_PASSWORD your-chosen-password
```

Deploy:
```
npx netlify-cli deploy --prod
```

Open the live URL it prints and test the login with your real credentials.

Whenever you edit the letter, certificate, or anything else, just run
`npx netlify-cli deploy --prod` again to push the update live.

## 3. Push to GitHub afterward, as backup / portfolio only

This step is independent of deployment — GitHub is not connected to the
live site, so pushing here never triggers a redeploy, and `.env` stays out
either way:

```
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/rakhi-for-karishma.git
git push -u origin main
```

Repo can be public — recruiters can browse the full code and content, just
never the real credentials (only `.env.example`, with placeholder names, is
tracked).

To make a future code change live, you always deploy from the CLI
(`netlify-cli deploy --prod`); pushing to GitHub is a separate, optional
step whenever you want that backup updated too.

## Editing the message or certificate

Everything text-wise is in `public/index.html`:
- The letter is inside `<article class="letter">`
- The certificate is inside `<section class="certificate-wrap">`
- The three fact cards (dance / Taylor Swift / makeup) are in `<section class="facts-page">`

Colors and fonts are CSS variables at the top of `public/css/style.css`
(`:root { ... }`) if you want to adjust the palette.

## Project structure

```
netlify.toml
netlify/
  functions/
    login.js        <- server-side password check
public/
  index.html         <- all page content (6 "card" pages)
  css/style.css       <- design system
  js/app.js           <- login flow + page navigation
.env.example           <- reference only, not real credentials
```
