---
permalink: /soap/
title: "Handgemaakte Zeep"
layout: single
author_profile: true
---
![zeep verpakkingen](/assets/images/zeep1.jpg "mooie zeepjes")

<div class="custom-list-container" style="box-sizing: border-box; width: 100%;">
<ul style="list-style-type: none; padding: 0; margin: 0; box-sizing: border-box;">
{% for post in site.posts %}
{% if post.tags contains "zeep" %}
    <li style="margin-bottom: 2em; box-sizing: border-box;">
        <a href="{{ post.url }}" style="text-decoration:none;">
            <div style="display: flex; align-items: flex-start; box-sizing: border-box; overflow: hidden;">
                {% if post.header.teaser %}
                    <img src="{{ post.header.teaser }}" alt="Teaser image for {{ post.title }}" style="max-width:200px; height:auto; margin-right:1em; box-sizing: border-box; object-fit: contain; display: block;">
                {% endif %}
                <div style="box-sizing: border-box; flex: 1; display: flex; flex-direction: column; justify-content: flex-start;">
                    <div class="custom-post-title">{{ post.title }}</div>
                    <div id="custom-post-date">
                        <i class="fas fa-fw fa-calendar-alt"></i>
                        {{ post.date | date: "%B %-d, %Y" }}
                    </div>
                    <div class="custom-post-excerpt">{{ post.excerpt }}</div>
                </div>
            </div>
        </a>
    </li>
{% endif %}
{% endfor %}
</ul>
</div>

{% if page.tags %}
    {% for tag in page.tags %}
        <a href="{{site.baseurl}}/archive.html#{{tag | slugize}}">
            #{{ tag }}
        </a>
    {% endfor %}
{% endif %}

<style>
@media (max-width: 600px) {
  .custom-list-container li img {
    max-width: 80px !important;
    width: 80px !important;
    height: auto !important;
    object-fit: contain !important;
    display: block;
  }
  .custom-list-container li > a > div {
    align-items: flex-start !important;
    min-height: 0 !important;
    overflow: hidden !important;
  }
  .custom-list-container li > a > div > div {
    flex: 1 1 auto;
    min-height: 0 !important;
  }
  .custom-post-date {
    margin-top: 0.65em;
  }
  .custom-post-title {
    margin-top: 0.25em;
    font-size: 1.1em;
  }
  .custom-post-excerpt {
    margin-top: 0.5em;
    margin-bottom: 0 !important;
    font-size: 1em;
  }
}
.custom-list-container li > a > div {
  align-items: flex-start;
  overflow: hidden;
}
.custom-list-container li img {
  height: auto;
  object-fit: contain;
  display: block;
}
</style>
