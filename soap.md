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
            <li style="margin-bottom: 2em;">
                {% if post.header.teaser %}
                    <a href="{{ post.url }}">
                        <img src="{{ post.header.teaser }}" alt="Teaser image for {{ post.title }}" style="max-width:200px; display:block; margin-bottom:0.5em;">
                    </a>
                {% endif %}
                <a href="{{ post.url }}">{{ post.title }}</a>
                {{ post.excerpt }}
            </li>
        {% endif %}
    {% endfor %}
</ul>
{%- if page.tags -%}
    {% for tag in page.tags %}
        <a href="{{site.baseurl}}/archive.html#{{tag | slugize}}">
            #{{ tag }}
        </a>
    {% endfor %}
{%- endif -%}
