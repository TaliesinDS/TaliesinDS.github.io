Arthur Kortekaas — Portfolio (Jekyll + Minimal Mistakes)

Live site
- https://www.arthurkortekaas.nl (custom domain)
- Fallback: https://taliesinds.github.io/

About
- This repository contains the source for my personal site built with Jekyll and the Minimal Mistakes theme (remote_theme mmistakes/minimal-mistakes@4.27.1).
- Default locale: nl-NL. Content lives primarily under `_posts/`, `_pages/`, and `tag/`.

Quick start (Windows / PowerShell)
1) Prerequisites: Ruby (with DevKit), Bundler, and Git.
2) Install dependencies:

```powershell
bundle install
```

3) Run the site locally:

```powershell
bundle exec jekyll serve --livereload
```

4) Open http://127.0.0.1:4000/ (uses `baseurl: ""`).

Content workflow
- New post: run the helper script and follow the prompt; it creates a dated file in `_posts/` with front matter and bilingual placeholders.

```powershell
powershell -ExecutionPolicy Bypass -File .\new-jekyll-post.ps1
```

- Tags: add tags in a post’s front matter. Optionally generate tag pages (Markdown files in `tag/`) with:

```bat
generate_tags.bat
```

	Notes:
	- The `jekyll-archives` plugin is also configured to output tag archives at `/tag/:name/`.
	- The Ruby generator (`generate_tag_pages.rb`) is provided to pre-create tag pages if desired.

Deployments
- This is a Pages repo (`username.github.io`) and builds automatically on push to `main`.
- Custom domain is configured via `CNAME` (www.arthurkortekaas.nl) and GitHub manages TLS.

Project structure (high-level)
- `_posts/` — dated posts (Markdown).
- `_pages/` — standalone pages.
- `tag/` — tag landing pages (manual/generated).
- `assets/` — images, CSS, JS. Do not edit the first 3 lines of `assets/css/main.scss` (required front matter for Jekyll’s Sass pipeline).
- `_data/` — navigation, UI text, and tag metadata.
- `_includes/`, `_layouts/`, `_sass/` — theme customizations and partials.

Licensing
- Original content licensing and details: see `licensing.md` (Creative Commons BY-NC 4.0 for my original text/images).
- Theme: Minimal Mistakes (MIT). See `LICENSE` for theme license.

Credits
- Theme by Michael Rose: https://github.com/mmistakes/minimal-mistakes
