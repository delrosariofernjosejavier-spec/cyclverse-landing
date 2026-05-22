# Cycleverse n8n connection: needed to finish

The landing is ready to submit registrations to n8n, but these values are required to finish the live connection.

## 1. n8n production webhook URL

Needed value:

```text
https://YOUR-N8N-DOMAIN/webhook/ciclismo-pro/subscribe
```

Use the **Production URL**, not the test URL.

In the landing file, replace:

```js
const N8N_WEBHOOK_URL = "PASTE_YOUR_N8N_PRODUCTION_WEBHOOK_URL_HERE";
```

with your real n8n webhook URL.

## 1B. 24/7 public setup

For anyone to register at any time, both parts must be public and always online:

- The landing must be hosted on a public URL, not only opened with `file:///`.
- n8n must run on n8n Cloud or on an always-on server/VPS.
- The n8n workflow must be active/published.
- Use the production webhook URL in the landing.

Do not use a test webhook URL for the live landing. Test URLs are for manual testing inside n8n.

## 2. Email sender

Choose one main sender:

- Gmail node in n8n
- Brevo SMTP/API

Needed values:

- Sender name: `Cycleverse`
- Sender email
- Confirmed n8n credential is connected and working

## 3. Subscriber storage

The current workflow sends a welcome email, but it still needs a shared subscriber list for the daily newsletter.

Choose one:

- Google Sheets: simplest shared list
- Brevo contacts list: best for newsletter growth

Recommended:

```text
Brevo contacts list for sending
Google Sheets as backup/reporting
```

Needed fields:

- name
- email
- phone
- source

## 4. Public PDF URL

The welcome email has a placeholder PDF link.

Needed value:

```text
https://YOUR-PUBLIC-PDF-LINK/plan-zona2-cycleverse.pdf
```

The PDF must be public or accessible to anyone with the link.

## 5. Daily newsletter recipients

The scheduled part of the workflow currently creates the newsletter at 5PM RD time, but it does not yet loop through all registered subscribers.

Needed decision:

- Read subscribers from Google Sheets
- Or read subscribers from Brevo contacts

Then n8n must add:

- Get all active subscribers
- Split in batches
- Send the generated newsletter to each subscriber

The workflow timezone should stay as:

```text
America/Santo_Domingo
```

The scheduled trigger should run at:

```text
17:00 / 5PM RD time
```

## 6. API keys

The workflow should not store visible API keys inside nodes.

Needed credentials in n8n:

- OpenRouter or OpenAI credential for generating the daily newsletter
- Brevo credential if using Brevo for email
- Gmail credential if using Gmail for email

Do not paste API keys in chat. Add them inside n8n credentials.

## Current landing file

```text
C:\Users\delro\Documents\Codex\2026-05-20\xtccrea-una-landing-page-de-captura\cycleverse-landing-fixed.html
```
