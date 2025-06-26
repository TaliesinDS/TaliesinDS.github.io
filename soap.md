---
permalink: /soap/
title: "Handgemaakte Zeep"
layout: single
author_profile: true
---
![zeep verpakkingen](/assets/images/zeep1.jpg "mooie zeepjes")
informatie over de zeep die ik maak.

<ul style="list-style-type: none;">
{% for post in site.posts %}
    {% if post.tags contains "zeep" %}
        <li>
            {% if post.teaser %}
                <img src="{{ post.header.teaser }}" alt="teaser image" style="max-width:150px; display:block; margin-bottom:8px;">
            {% endif %}
            <a href="{{ post.url }}">{{ post.title }}</a>{{ post.excerpt }}
        </li>
    {% endif %}
{% endfor %}
</ul>

