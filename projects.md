---
permalink: /projects/
title: "andere dingen"
layout: single
author_profile: true
---
![zeep verpakkingen](/assets/images/zeep1.jpg "mooie zeepjes")

<ul style="list-style-type: none;">
{% for post in site.posts %}
    {% unless post.tags contains "zeep" %}
        <li>
            {% if post.teaser %}
        <a href="{{ post.url }}">
          <img src="{{ post.header.teaser }}" alt="Teaser image for {{ post.title }}" style="max-width:200px; display:block; margin-bottom:0.5em;">
        </a>
            {% endif %}
            <a href="{{ post.url }}">{{ post.title }}</a>{{ post.excerpt }}
        </li>
    {% endunless %}
{% endfor %}
</ul>


