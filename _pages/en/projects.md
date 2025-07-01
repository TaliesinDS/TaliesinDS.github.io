---
permalink: /:lang/projects/
title: "Various Projects"
layout: single
author_profile: true
lang: en
---

On this page, you'll find an overview of various projects I'm working on. Think of 3D printing, leatherworking, sewing, making small brass items like bag hardware, experimenting with AI, and many more creative activities. Here I share my experiences, ideas, and results from all kinds of general projects and hobbies. Get inspired by the different techniques and materials I use!

![zeep verpakkingen](/assets/images/zeep1.jpg "mooie zeepjes")

<div class="custom-list-container" style="box-sizing: border-box; width: 100%;">
<ul style="list-style-type: none; padding: 0; margin: 0; box-sizing: border-box;">
{% for post in site.posts %}
{% unless post.tags contains "zeep" %}
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
{% endunless %}
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