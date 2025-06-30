---
permalink: /soap/
title: "Handgemaakte Zeep"
layout: single
author_profile: true
---

Soap making is an ancient craft that dates back thousands of years, with its origins believed to be in ancient Babylon around 2800 BCE. Early soap was made by mixing animal fats with wood ash and water, a process known as saponification. The ancient Egyptians, Greeks, and Romans also developed their own soap recipes, often using olive oil and aromatic herbs for cleansing and medicinal purposes. During the Middle Ages, soap making became a specialized trade in Europe, with cities like Marseille and Castile gaining fame for their high-quality soaps made from olive oil. Over time, advancements in chemistry and the availability of new ingredients led to the development of milder, more effective soaps, transforming soap making from a household necessity into a refined art and a thriving industry.

![zeep verpakkingen](/assets/images/zeep1.jpg "mooie zeepjes")

<div class="custom-list-container" style="box-sizing: border-box; width: 100%;">
<ul style="list-style-type: none; padding: 0; margin: 0; box-sizing: border-box;">
{% for post in site.posts %}
{% if post.tags and post.tags contains 'zeep' %}
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
{% endif %}
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
