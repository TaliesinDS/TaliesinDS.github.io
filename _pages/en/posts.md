---
permalink: /:lang/posts/
title: "Alle posts"
layout: single
author_profile: true
excerpt: "This page displays a complete list of all posts on the site"
lang: en
This page provides a complete overview of all posts on the site, with the newest entries at the top. Here you can easily browse recent updates, articles, and stories in reverse chronological order. Whether you're looking for the latest content or want to revisit older posts, this overview offers a convenient way to discover everything that has been published.


<div class="custom-list-container" style="box-sizing: border-box; width: 100%;">
<ul style="list-style-type: none; padding: 0; margin: 0; box-sizing: border-box;">
  {% for post in site.posts %}
    <li style="margin-bottom: 2em; box-sizing: border-box;">
      <a href="{{ post.url }}" style="text-decoration:none;">
        <div style="display: flex; align-items: flex-start; box-sizing: border-box;">
          {% if post.header.teaser %}
            <img src="{{ post.header.teaser }}" alt="Teaser image for {{ post.title }}" style="max-width:200px; height:auto; margin-right:1em; box-sizing: border-box; object-fit: contain; display: block;">
          {% endif %}
          <div style="box-sizing: border-box; flex: 1; display: flex; flex-direction: column; justify-content: flex-start;">
             <div class="custom-post-title">{{ post.title }}</div>
              <div id="custom-post-date">
                  <i class="fas fa-fw fa-calendar-alt"></i>
                  {{ post.date | date: "%B %-d, %Y" }}
              </div>
              <div class="custom-post-excerpt">{{ post.excerpt | strip_html }}</div>
           </div>
        </div>
      </a>
    </li>
  {% endfor %}
</ul>
</div>
{% if page.tags %}
  <div class="post-tags">
    {% for tag in page.tags %}
      <a href="{{ '/tag/' | append: tag | slugify | append: '/' | relative_url }}" class="post-tag">#{{ tag }}</a>
    {% endfor %}
  </div>
{% endif %}
