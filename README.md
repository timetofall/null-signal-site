# Null Signal — Website

Dark tech landing site for the Null Signal video game, hosted on GitHub Pages.

---

## Setup: Get This Live on GitHub Pages

### Step 1 — Create the repo

1. Go to [github.com](https://github.com) and click **New repository**
2. Name it exactly: `null-signal-site` (or anything you want)
3. Set it to **Public**
4. Don't check "Add a README" (you already have files)
5. Click **Create repository**

### Step 2 — Push these files

In your terminal, from inside this folder:

```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/null-signal-site.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

### Step 3 — Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under "Branch", select `main` and `/ (root)`
4. Click **Save**
5. Wait ~1 minute, then your site is live at:
   `https://YOUR-USERNAME.github.io/null-signal-site/`

---

## File Structure

```
null-signal-site/
├── index.html      ← Home page
├── about.html      ← About / Story page
├── media.html      ← Screenshots & Media page
├── style.css       ← All styles (edit this to change the look)
├── main.js         ← Minor JS interactions
├── img/            ← (create this folder) Put screenshots here
└── README.md
```

## Adding Screenshots

1. Create an `img/` folder
2. Drop your screenshot files in there (e.g. `screenshot-01.png`)
3. In `media.html`, replace the placeholder `<div class="screenshot-placeholder">` with:

```html
<img src="img/screenshot-01.png" alt="Description of screenshot" />
```

## Iterating

After making changes locally:

```bash
git add .
git commit -m "Describe what you changed"
git push
```

GitHub Pages will automatically update within a minute or two.
