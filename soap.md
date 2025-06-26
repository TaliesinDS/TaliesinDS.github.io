---
permalink: /soap/
title: "Handgemaakte Zeep"
layout: single
author_profile: true
---
![zeep verpakkingen](/assets/images/zeep1.jpg "mooie zeepjes")

<div class="custom-list-container">
<ul style="list-style-type: none;">
    {% for post in site.posts %}
        {% if post.tags contains "zeep" %}
            <li style="margin-bottom: 2em;">
                <a href="{{ post.url }}" style="text-decoration:none;">
                    <div style="display: flex; align-items: flex-start;">
                        {% if post.header.teaser %}
                            <img src="{{ post.header.teaser }}" alt="Teaser image for {{ post.title }}" style="max-width:200px; margin-right:1em; flex-shrink:0;">
                        {% endif %}
                        <div style="display: flex; flex-direction: column; justify-content: space-between; height: 200px; min-height: 120px; flex: 1;">
                            <div class="custom-post-title" style="flex: 0 0 auto;">{{ post.title }}</div>
                            <div id="custom-post-date" style="flex: 0 0 auto;">
                                <i class="fas fa-fw fa-calendar-alt"></i>
                                {{ post.date | date: "%B %-d, %Y" }}
                            </div>
                            <div style="flex: 0 0 auto;">{{ post.excerpt }}</div>
                        </div>
                    </div>
                </a>
            </li>
        {% endif %}
    {% endfor %}
</ul>
</div>

<style>
@media (max-width: 600px) {
  .custom-list-container div[style*="flex-direction: column"] {
    height: 120px !important;
    min-height: 80px !important;
  }
  .custom-list-container img {
    max-width: 100px !important;
  }
}
</style>
{%- if page.tags -%}
        {% for tag in page.tags %}
                <a href="{{site.baseurl}}/archive.html#{{tag | slugize}}">
                        #{{ tag }}
                </a>
        {% endfor %}
{%- endif -%}
