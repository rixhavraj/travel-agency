# 🚀 GymPro Deployment Master Guide

This guide provides step-by-step instructions on how to deploy the **GymPro Next.js frontend** to production from GitHub. 

Given your repository layout where the Next.js app sits in the `gym/frontend` subdirectory of a monorepo, follow these optimized configurations:

---

## 🛠️ Automated CI/CD (GitHub Actions)
We have already configured a GitHub Actions CI/CD workflow at [gym-frontend-ci.yml](file:///c:/Users/rixha/WorkSpace/Others/.github/workflows/gym-frontend-ci.yml). 
* **How it works:** Whenever you push code or open a Pull Request affecting files inside the `gym/frontend/` folder, GitHub automatically:
  1. Spins up a secure Ubuntu instance.
  2. Sets up a Node.js 20 environment.
  3. Installs clean, cached dependencies.
  4. Runs a full production build (`npm run build`).
* **Benefit:** Ensures that no broken code, type errors, or layout bugs are ever merged or deployed to production.

---

## ⚡ Option A: Deploy to Vercel (Recommended & Easiest)
Vercel is the creator of Next.js and provides native support for serverless features, dynamic routes, and fast image optimization out of the box with zero manual server setup.

### Step 1: Connect your GitHub Repository
1. Log in to [Vercel](https://vercel.com) using your GitHub account.
2. Click **Add New** -> **Project**.
3. Import your GitHub repository (`Others` or `gym`).

### Step 2: Configure Monorepo Settings (Crucial)
Because the frontend is inside `gym/frontend`, configure Vercel as follows:
* **Project Name:** `gympro-fitness`
* **Framework Preset:** `Next.js`
* **Root Directory:** Click **Edit** and select/type `gym/frontend`. 
  * *Note: Vercel will automatically detect this and scope all compile commands here.*
* **Build Command:** `next build` (Default)
* **Output Directory:** `.next` (Default)
* **Install Command:** `npm install` (Default)

### Step 3: Deploy!
Click **Deploy**. Vercel will build your application and generate a permanent production URL (e.g., `https://gympro-fitness.vercel.app`) in under 2 minutes, complete with automatic SSL and global edge CDN routing.

---

## 🐙 Option B: Deploy to GitHub Pages (Static Hosting)
GitHub Pages is a static file hosting service. Since Next.js is fully static-capable, you can export your pages into HTML/CSS files. 

> ⚠️ **Important Limitations:** Static hosting disables server-side functions (like custom API server routes) and standard Next.js image optimization (which runs on a server). However, all routes (`/pricing`, `/blog`, `/shop`, `/about`) are pre-rendered and will work perfectly.

### Step 1: Prepare `next.config.ts` for Static Export
Open `gym/frontend/next.config.ts` and modify it to enable static output and disable dynamic image optimization:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Enables static export
  images: {
    unoptimized: true, // Disables server-side image compression (required for static hosts)
  },
};

export default nextConfig;
```

### Step 2: Configure Your Repository on GitHub
1. Push your changes to your GitHub repository.
2. In your GitHub repository, go to **Settings** -> **Pages**.
3. Under **Build and deployment** -> **Source**, select **GitHub Actions**.

### Step 3: Enable the GitHub Pages Deployment Workflow
You can use the official Next.js Pages action. Create a new file at `.github/workflows/deploy-pages.yml` with the following configuration to deploy automatically on push:

```yaml
name: Deploy Next.js to GitHub Pages

on:
  push:
    branches: ["main", "master"]
    paths:
      - 'gym/frontend/**'

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: gym/frontend
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: npm
          cache-dependency-path: gym/frontend/package-lock.json
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Install dependencies
        run: npm ci
      - name: Build and Export Static Site
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./gym/frontend/out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 🌩️ Option C: Deploy to Netlify
Netlify is another excellent serverless option that handles monorepos cleanly.

1. Go to [Netlify](https://netlify.com) and connect your GitHub account.
2. Select your repository.
3. In **Build settings**:
   * **Base directory:** `gym/frontend`
   * **Build command:** `npm run build`
   * **Publish directory:** `gym/frontend/.next`
4. Click **Deploy**. Netlify will install, compile, and publish your site with a custom subdomain.
