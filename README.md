# A Rakhi

A private, password-gated Raksha Bandhan page. No photos anywhere — the
entire design (thread animation, avatars, certificate, icons) is hand-built
in CSS/SVG, across six pages you flip through like a greeting card.

## How the login works

The login form sends whatever's typed to a small server-side function
(`netlify/functions/login.js`), which checks it against two hardcoded
values at the top of that file:

\`\`\`js
const APP_USERNAME = "yourloginid";
const APP_PASSWORD = "yourpassword";
\`\`\`

Change those two lines to whatever ID/password you want Karishma to use,
then redeploy. The check happens server-side, so the password is never
sent to the browser in the page's HTML/CSS/JS — only the login attempt
result (success or failure) comes back.

**Important if you ever push this to a public GitHub repo:** since the
password is now hardcoded directly in `login.js`, that file will contain
your real password in plain text. Before pushing to a *public* repo,
either swap in a placeholder value in `login.js`, or keep the repo private.
This is different from an earlier version of this project that used
Netlify environment variables instead — this hardcoded version trades a
little security for being simpler to deploy via drag-and-drop.

## Run it locally

\`\`\`
npm install
npm run dev
\`\`\`

Open the printed local URL (usually `http://localhost:8888`) and log in
with whatever values are currently set in `login.js`. No `.env` file
needed anymore — the credentials are already in the code.

## Deploying (drag-and-drop)

Netlify's drag-and-drop deploy will fail if you drag the whole project,
because it also scans `node_modules` and can trip its secret scanner. Only
three things actually need to be deployed:

1. Create a new empty folder somewhere (e.g. `rakhi-deploy`).
2. Copy just these three items into it from this project:
   - `netlify.toml`
   - `netlify/` (contains `functions/login.js`)
   - `public/` (contains `index.html`, `css/`, `js/`)
3. Do **not** copy `node_modules`, `package.json`, `package-lock.json`, or
   `.gitignore` — none of these are needed for the live site.
4. Go to your site's **Deploys** tab in the Netlify dashboard and drag that
   clean `rakhi-deploy` folder onto the drop zone there (not
   app.netlify.com/drop, which would create a brand new separate site).
5. Wait for it to say **Published**, then open your site's URL and log in
   with the real values from `login.js`.

Whenever you change the letter, certificate, colors, or the password
itself, repeat steps 2–5 with a fresh copy into `rakhi-deploy`.


## Editing the message, certificate, or colors

Everything content-wise is in `public/index.html`:
- The letter is inside `<article class="letter">`
- The avatar illustration + rakhi-tying moment is in `<section class="rakhi-moment">`
- The three fact cards are in `<section class="facts-page">`
- The certificate is inside `<section class="certificate-wrap">`

Colors and fonts are CSS variables at the top of `public/css/style.css`
(`:root { ... }`) if you want to adjust the palette.

## Project structure

\`\`\`
netlify.toml
netlify/
  functions/
    login.js        <- server-side check, credentials hardcoded here
public/
  index.html         <- all page content (6 "card" pages)
  css/style.css       <- design system
  js/app.js           <- login flow + page navigation
\`\`\`
