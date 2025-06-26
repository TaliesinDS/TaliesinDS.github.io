---
permalink: /projects/
title: "andere dingen"
layout: single
author_profile: true
---
![zeep verpakkingen](/assets/images/zeep1.jpg "mooie zeepjes")

<!-- Add a wrapper div to control alignment -->
<div style="margin-left: 0; padding-left: 0;">

<ul style="list-style-type: none; margin-left: 0; padding-left: 0;">
    {% for post in site.posts %}
        {% unless post.tags contains "zeep" %}
            <li style="margin-bottom: 2em;">
                {% if post.header.teaser %}
                    <a href="{{ post.url }}">
                        <img src="{{ post.header.teaser }}" alt="Teaser image for {{ post.title }}" style="max-width:200px; display:block; margin-bottom:0.5em;">
                    </a>
                {% endif %}
                <a href="{{ post.url }}">{{ post.title }}</a>
                {{ post.excerpt }}
            </li>
        {% endunless %}
    {% endfor %}
</ul>

</div>
{%- if page.tags -%}
    {% for tag in page.tags %}
        <a href="{{site.baseurl}}/archive.html#{{tag | slugize}}">
            #{{ tag }}
        </a>
    {% endfor %}
{%- endif -%}