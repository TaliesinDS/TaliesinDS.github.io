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
        {% if post.header and post.header.teaser %}
            {% assign teaser = post.header.teaser %}
        {% elsif post.header and post.header['teaser'] %}
            {% assign teaser = post.header['teaser'] %}
        {% elsif post['header'] and post['header']['teaser'] %}
            {% assign teaser = post['header']['teaser'] %}
        {% else %}
            {% assign teaser = '/assets/images/bull200px.webp' %}
        {% endif %}
        <a href="{{ post.url | relative_url }}" class="tag-post-item-link">
            <div class="tag-post-item">
                <div class="tag-post-teaser">
                    <img src="{{ teaser | relative_url }}" alt="Teaser" class="tag-post-img">
                </div>
                <div class="tag-post-content">
                    <h4 class="tag-post-title">
                        {{ post.title }}
                    </h4>
                    <div class="tag-post-date">
                        <span class="icon-calendar" aria-hidden="true">{% include icons/fontawesome/calendar-days.svg %}</span>
                        {{ post.date | date: "%b %-d, %Y" }}
                    </div>
                    <div class="tag-post-excerpt">{{ post.excerpt | strip_html | truncatewords: 40 }}</div>
                </div>
            </div>
        </a>
    {% endfor %}
</div>
