# TaliesinDS — Main Body Text Style Package

Purpose: this is a **complete, portable style guide** for generating and editing the *main body of text* in a calm, long-form, serif-first layout. It is written so another LLM can follow it **without seeing the site**.

Scope:
- **In scope:** prose inside the main content container (recommended class name: `.prose`), including headings, paragraphs, lists, quotes, inline emphasis, and inline icons.
- **Out of scope:** navigation, cards/teasers, comments UI, forms, and any “hero banner” title treatments.

Do not invent new design tokens:
- Use the existing **typography, spacing, and semantics** described here.
- Do not add new colors, fonts, decorative rules, or new UI components.

---

## Editorial Principles

1. **Clarity over cleverness**
   - Prefer concrete nouns and verbs.
   - Avoid jargon unless you define it once, plainly.

2. **Long-form readability**
   - Write for scanning *and* for deep reading.
   - Use headings to create a clear outline.

3. **Low-drama, high-signal voice**
   - Calm, precise, and non-performative.
   - Avoid sensational framing, excessive intensifiers, and rhetorical yelling.

4. **Human-first tone**
   - Empathetic where appropriate.
   - When discussing sensitive topics, be careful and specific; do not generalize.

5. **Strong structure, light ornament**
   - Use typographic hierarchy (H2/H3/H4) rather than visual tricks.
   - Decorative dividers exist, but should be used sparingly.

---

## Tone & Register

Target register:
- **Thoughtful, essay-like, margin-friendly.**
- Short sentences are fine, but do not make the whole piece staccato.

Default voice rules:
- Prefer **active voice** unless passive is clearer.
- Use **first person singular** only when it adds accountability or narrative.
- Use **second person** (“you”) sparingly; prefer neutral framing.

---

## Layout Assumptions (for the body)

This style is built for **long-form reading** with generous margins.

Recommended, plain-HTML layout model:
- An outer wrapper that is centered and bounded: `max-width: 1280px`, `padding-inline: 1em`.
- Optional sidebar on wide screens (classic, “old-fashioned CSS” is fine): reserve roughly `200px` for the sidebar and let the main text take the remaining width.
- A main content container (`.prose`) that provides **internal padding**: `padding: 2em`.

Practical implications for writing:
- Avoid giant tables.
- Avoid very long, unbroken code or URLs in paragraphs.
- Prefer images that can scale fluidly.

---

## Typographic System

### Font families (actual)
Primary text face (body + headings):
- `EB Garamond` (self-hosted via `@font-face`), with serif fallbacks.

Small caps face:
- `EB Garamond SC 12` (self-hosted), used for small-caps styling.

Monospace:
- Use a normal monospace stack (e.g., `ui-monospace, Consolas, monospace`). Inline code inside the body should be visually small.

### Base sizing
Assume the site base font size is:
- `16px`.

### Main hierarchy (as rendered)
Headings are set globally (overriding theme defaults):
- `h1`: `2em` (≈32px), weight `600`, line-height `1.2`
- `h2`: `1.6em` (≈25.6px), weight `500`, line-height `1.2`
- `h3`: `1.4em` (≈22.4px), weight `400`, line-height `1.2`
- `h4`: `1.25em` (≈20px), weight `400`, line-height `1.2`
- `h5`: `1.1em` (≈17.6px), weight `400`, line-height `1.2`
- `h6`: `1em` (≈16px), weight `400`, line-height `1.2`

Body text inside the main content container (`.prose`):
- `p`: `0.95em` (≈15.2px), weight `450`, line-height `1.474`
- paragraph spacing: `margin-bottom: 1.3em` (and no top margin by default)

Lists inside `.prose`:
- `li`: `1.1em` (≈17.6px), weight `450`, line-height `1em`
- list item spacing: `margin-bottom: 0.5em`

Small text:
- `.small` / `small`: `0.75em` (≈12px)

### Semantics and heading usage
Use headings to build a clean outline:
- Use `##` (H2) for major sections.
- Use `###` (H3) for subsections.
- Use `####` (H4) only when you truly have 3+ subsections and need more structure.

H1 usage rule:
- Use **one H1** per page (the page title) *if* your page doesn’t already provide a separate title.
- If your system already renders a page title elsewhere (header, template, CMS), start the body outline at **H2**.

---

## Rhythm & Density (vertical spacing)

This site aims for a **comfortable, essay-like rhythm**:
- Paragraphs have clear separation (`margin-bottom ≈ 1.3em`).
- Line height for body paragraphs is intentionally roomy (`≈ 1.474`).

Guidelines:
- Keep paragraphs **short to medium** (2–6 lines on desktop) unless doing deliberate long-form.
- Do not stack many one-line paragraphs; it reads choppy.
- Lists are slightly larger and tighter line-height; keep each list item short.

Dividers:
- `hr` is rendered as centered `***` (not a line). Use sparingly to signal a true section break.

---

## Inline Semantics

Emphasis:
- Use `*italic*` for gentle emphasis.
- Use `**bold**` sparingly (names, key terms, warnings). Avoid bolding whole sentences.

Quotes:
- Use inline quotes with `"..."` or the HTML `q` element when needed; `q` is configured to render curly quotes.
- Use blockquotes for longer quoted passages.

Small caps:
- Use the `.sc` class for small-caps callouts or label-like text.
- `.sc` uses `EB Garamond SC 12`, `font-variant: small-caps`, and is slightly smaller and heavier.

Intro/lead paragraph:
- Use `.intro-text` for an opening paragraph that needs a gentle lead-in (bigger than body).

Centered italic:
- Use `.center-italic` only for rare, deliberate “epigraph” moments.

---

## Links

- Links should read naturally in running text.
- Don’t paste raw URLs inline unless necessary; use descriptive link text.
- Hover behavior underlines links (theme behavior).

If you’re implementing this in plain CSS, keep link styling minimal: inline links should look like links, but should not visually dominate paragraphs.

---

## Images and Figures (in body)

- Prefer Markdown images that can scale fluidly.
- When you need a caption, use a `figure` with `figcaption`.
- Images are rounded (`border-radius: 4px`) by the theme.

If you’re implementing this in plain CSS, you may keep the same `border-radius: 4px` for images to match the rest of the system.

Avoid:
- Very small images floated into text.
- Dense image grids inside long essays.

---

## Icons (inline SVG)

Icons are used as **inline SVG** and styled to behave like text glyphs:
- default sizing: `width: 1em; height: 1em; fill: currentColor; display: inline-block;`
- alignment:
  - most icons: `vertical-align: middle`
  - calendar/pdf: `vertical-align: text-bottom`

Practical rule:
- Treat icons as punctuation or short labels; don’t stack multiple decorative icons.

---

## “LLM Rules” (strict)

When generating new body content, do all of the following:
- Use paragraphs with blank lines between them.
- Prefer starting section headings at H2 (`##`) unless the page needs a visible H1 title.
- Prefer 2–6 line paragraphs; use H3s to break long sections.
- Use lists only when the content is genuinely list-like.
- Do not introduce new CSS classes other than: `prose`, `sc`, `intro-text`, `center-italic`, `small` (and standard HTML elements).
- Do not introduce new fonts or icons.

---

## Implementation (plain HTML/CSS)

The style package includes a convenience stylesheet you can drop into any static HTML page:
- Use `main-body.css` as your baseline.
- Wrap your article content in a container with class `.prose`.

Minimal HTML skeleton (sidebar optional):

```html
<div class="layout">
   <aside class="sidebar">
      <!-- navigation / meta -->
   </aside>
   <main class="content">
      <article class="prose">
         <h1>Page title (optional)</h1>
         <p class="intro-text">Optional lead paragraph.</p>
         <h2>Section</h2>
         <p>Body paragraph…</p>
      </article>
   </main>
</div>
```

Notes:
- Keep the sidebar visually quieter than the prose.
- Do not add decorative UI inside the prose container.

---

## Assets included in this package

This folder also includes copies of:
- Fonts (WOFF/WOFF2) used by `EB Garamond` and `EB Garamond SC 12`
- Font Awesome SVG icons currently present in the repo

See the `assets/` subfolder.
