---
permalink: /posts/
title: "Alle posts"
layout: single
author_profile: true
---
To display teaser images for each post in this list, you need to add a `teaser` field to the front matter (YAML block at the top) of each individual post markdown file. For example:

```yaml
---
title: "My Post Title"
date: 2024-06-01
teaser: /assets/images/my-teaser-image.jpg
---
```

Make sure the `teaser` path points to the image you want to display. The code below will then show the teaser image (if present) above the post title in the list.

```markdown
<ul style="list-style-type: none;">
  {% for post in site.posts %}
    <li style="margin-bottom: 2em;">
      {% if post.teaser %}
        <a href="{{ post.url }}">
          <img src="{{ post.teaser }}" alt="Teaser image for {{ post.title }}" style="max-width:200px; display:block; margin-bottom:0.5em;">
        </a>
      {% endif %}
      <a href="{{ post.url }}">{{ post.title }}</a>
      {{ post.excerpt }}
    </li>
  {% endfor %}
</ul>
{%- if page.tags -%}
    {% for tag in page.tags %}
        <a href="{{site.baseurl}}/archive.html#{{tag | slugize}}">
            #{{ tag }}
        </a>
    {% endfor %}
{%- endif -%}
```

**Summary:**  
1. Add a `teaser` field to each post's front matter.  
2. Place the image at the specified path.  
3. The provided code will automatically display the teaser image and title for each post.

