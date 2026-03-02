# Portfolio — Product Manager

A minimal, static personal portfolio site optimized for GitHub Pages deployment.

## Deploy to GitHub Pages

1. Create a GitHub repo named `<your-username>.github.io`
2. Push this folder's contents to the `main` branch:
   ```bash
   cd portfolio
   git init
   git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
   git add -A
   git commit -m "Initial portfolio"
   git push -u origin main
   ```
3. Go to **Settings → Pages** in your repo and set source to `main` branch, root `/`.
4. Your site will be live at `https://<your-username>.github.io` within a few minutes.

## Customize

- **Content**: Edit HTML files directly. All placeholder text is marked clearly.
- **Projects**: Update `data/projects.json` to add/remove projects.
- **Blog posts**: Add new HTML files in `blog/` following the existing template.
- **Case studies**: Add new HTML files in `work/` following the existing template.
- **Styling**: Tailwind classes inline. Custom overrides in `css/custom.css`.
- **Colors/Fonts**: Edit the `tailwind.config` object in any HTML `<head>`.

## Stack

- **HTML** — static pages, no build step
- **Tailwind CSS** — via CDN (play script)
- **Alpine.js** — via CDN (filtering, mobile nav)
- **Zero dependencies** — no npm, no bundler, no framework

## Structure

```
├── index.html          Home
├── about.html          About / Bio
├── work.html           Case studies listing
├── projects.html       Projects listing (filterable)
├── blog.html           Blog listing
├── 404.html            Custom 404
├── work/               Individual case studies
├── blog/               Individual blog posts
├── data/projects.json  Project data
├── js/main.js          Shared utilities
├── css/custom.css      Style overrides
└── assets/             Images, icons, resume PDF
```
