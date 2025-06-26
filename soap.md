---
permalink: /soap/
title: "Handgemaakte Zeep"
layout: single
author_profile: true
---
![zeep verpakkingen](/assets/images/zeep1.jpg "mooie zeepjes")
informatie over de zeep die ik maak.
<div class="custom-list-container">
<ul style="list-style-type: none;">
    {% for post in site.posts %}
        {% if post.tags contains "zeep" %}
            <li style="margin-bottom: 2em;">
                <a href="{{ post.url }}" style="text-decoration:none;">
                    <div style="display: flex; align-items: flex-start;">
                        {% if post.header.teaser %}
                            <img src="{{ post.header.teaser }}" alt="Teaser image for {{ post.title }}" style="max-width:200px; margin-right:1em;">
                        {% endif %}
                        <div>
                            <div style="font-weight:bold;">{{ post.title }}</div>
                            <div class="custom-post-date">
                                {{ post.date | date: "%d-%m-%Y" }}
                            </div>
                            <div>{{ post.excerpt }}</div>
                        </div>
                    </div>
                </a>
            </li>
        {% endif %}
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
