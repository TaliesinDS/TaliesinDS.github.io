---
permalink: /soap/
title: "Handgemaakte Zeep"
layout: single
author_profile: true
---





Op deze pagina deel ik mijn ervaringen met het maken van handgemaakte zeep
<!--more-->
<style>
.page__content > p:first-child {
  display: none;
}
</style>

![zeep verpakkingen](/assets/images/zeep1.jpg "mooie zeepjes")

<div class="lang-content lang-nl" style="display:none;">
  <div class="lang-header">
    <h2 style="margin: 0.5em 0 0.5em;">Over mij</h2>
    <div class="lang-switcher">
      <button id="lang-toggle" onclick="toggleLang()">
        <img id="lang-flag" src="/assets/images/ui/gb.svg" alt="English flag">
      </button>
    </div>
  </div>
  <p>Op deze pagina deel ik mijn ervaringen met het maken van handgemaakte zeep, het ontwerpen van verpakkingen en het optimaliseren van het productieproces. Ik ben geen expert, maar vind het leuk om te experimenteren met verschillende recepten, technieken en materialen. Hier lees je over mijn ontdekkingen, successen en soms ook mislukkingen tijdens het leren en uitproberen. Of het nu gaat om het vinden van de juiste ingrediënten, het testen van nieuwe vormen of het bedenken van creatieve verpakkingen, ik neem je graag mee in mijn persoonlijke leerproces en experimenten rondom ambachtelijke zeep.</p>
</div>

<div class="lang-content lang-en">
  <div class="lang-header">
    <h2 style="margin: 0.5em 0 0.5em;">About Me</h2>
    <div class="lang-switcher">
      <button id="lang-toggle" onclick="toggleLang()">
        <img id="lang-flag" src="/assets/images/ui/nl.svg" alt="Dutch flag">
      </button>
    </div>
  </div>
  <p>On this page I share my experiences with making handmade soap, designing packaging, and optimizing the production process. I am not an expert, but I enjoy experimenting with different recipes, techniques, and materials. Here you can read about my discoveries, successes, and sometimes also failures while learning and trying things out. Whether it’s finding the right ingredients, testing new shapes, or coming up with creative packaging, I’m happy to take you along in my personal learning process and experiments with artisanal soap.</p>
</div>




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
