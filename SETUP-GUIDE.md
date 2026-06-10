# MT Fitness Site — GitHub & Netlify Setup Guide

Your site files are ready. Follow these steps to get it live.

---

## Step 1 — Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in.
2. Click the **+** icon (top right) → **New repository**.
3. Name it something like `mt-fitness-site`.
4. Leave it **Public** (required for free Netlify hosting).
5. Do **not** check "Add a README" — leave it empty.
6. Click **Create repository**.

---

## Step 2 — Upload Your Site Files to GitHub

You have two options:

### Option A — Drag & Drop (easiest, no coding needed)

1. On your new repository page, click **uploading an existing file**.
2. Drag all 4 files into the upload area:
   - `index.html`
   - `contact.html`
   - `success.html`
   - `style.css`
3. Click **Commit changes**.

### Option B — GitHub Desktop App

1. Download [GitHub Desktop](https://desktop.github.com) if you don't have it.
2. Clone your new repository to your computer.
3. Copy the 4 site files into the cloned folder.
4. In GitHub Desktop: write a commit message like "Initial site build" → click **Commit to main** → **Push origin**.

---

## Step 3 — Deploy to Netlify

1. Go to [netlify.com](https://netlify.com) and sign up / log in (use "Sign in with GitHub").
2. Click **Add new site** → **Import an existing project**.
3. Choose **GitHub** and authorize Netlify.
4. Select your `mt-fitness-site` repository.
5. Leave all build settings blank (this is a plain HTML site).
6. Click **Deploy site**.

Netlify will give you a live URL like `https://mt-fitness-abc123.netlify.app` in about 60 seconds.

---

## Step 4 — Set Up Contact Form Email Notifications

Netlify Forms automatically captures your form submissions. To get emailed at **jacobalexander2017@gmail.com**:

1. In Netlify, go to your site → **Forms** tab.
2. You'll see a form called **"contact"** appear after the first test submission.
3. Click on the form → **Form notifications**.
4. Click **Add notification** → **Email notification**.
5. Enter `jacobalexander2017@gmail.com` as the email address.
6. Click **Save**.

> **Test it:** Submit the contact form on your live site, then check that the email arrives.

---

## Step 5 — (Optional) Add a Custom Domain

If you buy a domain (e.g., `mtfitnesscoaching.com`):

1. In Netlify → **Domain settings** → **Add custom domain**.
2. Enter your domain name.
3. Follow Netlify's DNS instructions (update nameservers at your domain registrar).
4. Netlify automatically provides a free SSL certificate.

---

## Future Updates

Every time you update your site files:

- **Option A:** Go to your GitHub repo, click the file → edit pencil icon → make changes → commit.
- **Option B:** Edit files locally, then push via GitHub Desktop.

Netlify will automatically redeploy within ~30 seconds of any GitHub push.

---

## Your Site Files

| File | Purpose |
|------|---------|
| `index.html` | Home page — hero, movement patterns, CTA |
| `contact.html` | Contact form page |
| `success.html` | Confirmation page after form submission |
| `style.css` | All styles (shared across pages) |
