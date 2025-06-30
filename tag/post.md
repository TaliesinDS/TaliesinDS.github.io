---
layout: tag
title: post
permalink: /tag/post/
---

<h1>Posts tagged with "{{ page.title }}"</h1>
<div class="tag-post-list">
  {% assign tagname = page.title %}
  {% assign tagged_posts = site.posts | where_exp: "post", "post.tags contains tagname" %}
  {% for post in tagged_posts %}
    <div class="tag-post-item" style="display: flex; align-items: flex-start; margin-bottom: 2em;">
      <div class="tag-post-teaser" style="flex: 0 0 120px; margin-right: 1em;">
        <a href="{{ post.url | relative_url }}">
          <img src="{{ post.teaser | default: '/assets/images/bull200px.webp' }}" alt="Teaser" style="max-width: 120px; height: auto; display: block;">
        </a>
      </div>
      <div class="tag-post-content" style="flex: 1 1 0%;">
        <h2 style="margin-top:0;">
          <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        </h2>
        <div style="color: #888; font-size: 0.9em; margin-bottom: 0.5em;">
          {{ post.date | date: "%b %-d, %Y" }}
        </div>
        <p>{{ post.excerpt | strip_html | truncatewords: 40 }}</p>
      </div>
    </div>
  {% endfor %}
</div>