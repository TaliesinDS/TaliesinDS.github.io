---
layout: tag
title: "Alle posts met de tag 'zeep'"
permalink: /tag/zeep/
header: false
---

<div class="tag-post-list">
{% assign tagname = page.name | split: '.' | first %}
{% assign tagged_posts = site.posts | where_exp: "post", "post.tags contains tagname" %}
    {% for post in tagged_posts %}
        <a href="{{ post.url | relative_url }}" class="tag-post-item-link" style="text-decoration: none; color: inherit;">
            <div class="tag-post-item" style="display: flex; align-items: flex-start; margin-bottom: 2em;">
                <div class="tag-post-teaser" style="flex: 0 0 120px; margin-right: 1em;">
                    <img src="{{ post.teaser | default: '/assets/images/bull200px.webp' }}" alt="Teaser" style="max-width: 120px; height: auto; display: block;">
                </div>
                <div class="tag-post-content" style="flex: 1 1 0%;">
                    <h2 style="margin-top:0;">
                        {{ post.title }}
                    </h2>
                    <div class="tag-post-date" style="color: #888; font-size: 0.9em; margin-bottom: 0.5em;">
                        <i class="fas fa-fw fa-calendar-alt" aria-hidden="true"></i>
                        {{ post.date | date: "%b %-d, %Y" }}
                    </div>
                    {% assign excerpt = post.excerpt | strip_html | strip_newlines | strip %}
                    {% if excerpt contains '{%' or excerpt contains '%}' or excerpt == "" %}
                      <p><em>Geen samenvatting beschikbaar.</em></p>
                    {% else %}
                      <p>{{ excerpt | truncatewords: 40 }}</p>
                    {% endif %}
                </div>
            </div>
        </a>
    {% endfor %}
</div>
