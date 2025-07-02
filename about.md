---
permalink: /about/
title: "Over mij"
layout: single
author_profile: true
tag: about
---

lorem ipsum


<div style="position:relative;width:60%;max-width:350px;margin:auto;height:0;padding-bottom:177.78%;">
  <iframe src="https://www.youtube.com/embed/ugcqTOxuyuk"
    style="position:absolute;top:0;left:0;width:50%;height:100%;"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>
</div>

---

## Tips for Embedding Portrait (Shorts) Videos

- **Change `width:60%;`** in the `<div>` to make the video bigger or smaller (e.g., `80%`, `40%`, etc.).
- `padding-bottom:177.78%` keeps the 9:16 aspect ratio (portrait).
- `max-width:350px;` prevents the video from getting too large on wide screens—adjust as needed.
- `margin:auto;` centers the video on the page.
- The `<iframe>` uses `width:100%;height:100%;` to always fill the container.

**Usage Example:**

```html
<div style="position:relative;width:80%;max-width:400px;margin:auto;height:0;padding-bottom:177.78%;">
  <iframe src="https://www.youtube.com/embed/ugcqTOxuyuk"
    style="position:absolute;top:0;left:0;width:100%;height:100%;"
    frameborder="0"
    allowfullscreen>
  </iframe>
</div>
```

Adjust the `width` and `max-width` values to fit your design needs!