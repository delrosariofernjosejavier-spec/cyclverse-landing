# Publish Cycleverse on GitHub Pages

GitHub Pages is a good simple option for this landing because it is a static HTML page.

## 1. Prepare the repo

This folder already has the correct entry file:

```text
index.html
```

GitHub Pages looks for `index.html`, `index.md`, or `README.md` as the entry file in the publishing source.

## 2. Create a GitHub repository

1. Go to GitHub.
2. Create a new repository, for example:

```text
cycleverse-landing
```

3. Make it public if you want the easiest free GitHub Pages setup.
4. Upload these files:

```text
index.html
.nojekyll
cycleverse-landing.json
cycleverse-n8n-needed-to-finish.md
```

## 3. Enable GitHub Pages

1. Open the repository on GitHub.
2. Go to `Settings`.
3. Go to `Pages`.
4. Under `Build and deployment`, choose:

```text
Source: Deploy from a branch
Branch: main
Folder: / root
```

5. Save.

After a minute or two, GitHub will show a public URL like:

```text
https://YOUR-USERNAME.github.io/cycleverse-landing/
```

## 4. Connect the n8n webhook

In `index.html`, replace this:

```js
const N8N_WEBHOOK_URL = "PASTE_YOUR_N8N_PRODUCTION_WEBHOOK_URL_HERE";
```

with your real n8n production webhook URL.

Use production URL, not test URL:

```text
https://YOUR-N8N-DOMAIN/webhook/ciclismo-pro/subscribe
```

Then commit/push the change again.

## 5. 24/7 requirement

GitHub Pages keeps the landing online.

n8n also must be online 24/7:

- n8n Cloud, or
- VPS/server that stays running.

If n8n is running only on your computer, the form will only work while your computer and n8n are on.

