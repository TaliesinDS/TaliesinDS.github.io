---
permalink: /projects/
title: "andere dingen"
layout: single
author_profile: true
lang: nl
---

Op deze pagina vind je een overzicht van uiteenlopende projecten waar ik aan werk. Denk aan 3D-printen, leerbewerking, naaien, het maken van kleine messing onderdelen zoals tassenbeslag, experimenten met AI en nog veel meer creatieve bezigheden. Hier deel ik mijn ervaringen, ideeën en resultaten van allerlei algemene projecten en hobby’s. Laat je inspireren door de verschillende technieken en materialen die ik gebruik!

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