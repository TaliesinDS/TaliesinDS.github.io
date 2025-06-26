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
                <img src="{{ post.heder.teaser }}" alt="teaser image" style="max-width:150px; display:block; margin-bottom:8px;">
            {% endif %}
            <a href="{{ post.url }}">{{ post.title }}</a>{{ post.excerpt }}
        </li>
    {% endunless %}
{% endfor %}
</ul>


