---
permalink: /posts/
title: "Alle posts"
layout: single
author_profile: true
---

<div class="custom-list-container">
<ul style="list-style-type: none;">
  {% for post in site.posts %}
    <li style="margin-bottom: 2em;">
      <a href="{{ post.url }}">{{ post.title }}</a>
      {{ post.excerpt }}
      {% if post.header.teaser %}
        <a href="{{ post.url }}">
          <img src="{{ post.header.teaser }}" alt="Teaser image for {{ post.title }}" style="max-width:200px; display:block; margin-top:0.5em;">
        </a>
      {% endif %}
    </li>
  {% endfor %}
</ul>
</div>
{%- if page.tags -%}
    {% for tag in page.tags %}
        <a href="{{site.baseurl}}/archive.html#{{tag | slugize}}">
            #{{ tag }}
        </a>
    {% endfor %}
{%- endif -%}