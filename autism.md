---
permalink: /autism/
title: "Over mijn ervaringen met autisme"
layout: single
author_profile: true
tag: about
---

<div class="lang-content lang-nl" style="display: block;">
  <div class="lang-header">
    <h2 style="margin: 0.5em 0 0.5em;">Over mij</h2>
    <div class="lang-switcher">
      <button id="lang-toggle" onclick="toggleLang()">
        <img id="lang-flag" src="/assets/images/ui/gb.svg" alt="English flag">
      </button>
    </div>
  </div>
 text over autisme
  </div>
</div>

<div class="lang-content lang-en" style="display: none;">
  <div class="lang-header">
    <h2 style="margin: 0.5em 0 0.5em;">About Me</h2>
    <div class="lang-switcher">
      <button id="lang-toggle" onclick="toggleLang()">
        <img id="lang-flag" src="/assets/images/ui/nl.svg" alt="Nederlandse vlag">
      </button>
    </div>
  </div>
 text about autism
</div>


<div class="empty-box">
</div>

<div class="comments-spacing">
  {% include comments.html %}
</div>

{% assign visible_posts = site.posts | where_exp: "post", "post.hidden != true" %}
<div class="custom-list-container" style="box-sizing: border-box; width: 100%;">
<ul style="list-style-type: none; padding: 0; margin: 0; box-sizing: border-box;">
{% for post in visible_posts %}
  {% if post.tags contains 'autism' %}
    <li style="margin-bottom: 2em; box-sizing: border-box;">
        <a href="{{ post.url }}" style="text-decoration:none;">
            <div style="display: flex; align-items: flex-start; box-sizing: border-box;">
                {% if post.header.teaser %}
                    <img src="{{ post.header.teaser }}" alt="Teaser image for {{ post.title }}" style="max-width:200px; height:auto; margin-right:1em; box-sizing: border-box; object-fit: contain; display: block;">
                {% endif %}
                <div style="box-sizing: border-box; flex: 1; display: flex; flex-direction: column; justify-content: flex-start;">
                    <div class="custom-post-title">{{ post.title }}</div>
                    <div id="custom-post-date">
                        <span class="icon-calendar" aria-hidden="true">{% include icons/fontawesome/calendar-days.svg %}</span>
                        {{ post.date | date: "%B %-d, %Y" }}
                    </div>
                    <div class="custom-post-excerpt">{{ post.excerpt | strip_html }}</div>
                </div>
            </div>
        </a>
    </li>
  {% endif %}
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