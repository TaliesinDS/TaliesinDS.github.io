---
permalink: /posts/
title: "Alle posts"
layout: single
author_profile: true
---
<ul style="list-style-type: none;">
  {% for post in site.posts %}
    <li style="margin-bottom: 2em;">
      {% assign teaser_image = post.teaser %}
      {% if not teaser_image and post.header and post.header.teaser %}
        {% assign teaser_image = post.header.teaser %}
      {% endif %}
      {% if teaser_image %}
        <a href="{{ post.url }}">
          <img src="{{ teaser_image }}" alt="Teaser image for {{ post.title }}" style="max-width:200px; display:block; margin-bottom:0.5em;">
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


