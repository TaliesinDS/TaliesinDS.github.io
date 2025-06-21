---
permalink: /soap/
title: "soap"
layout: single
author_profile: true
---

{% for tag in site.tags %}

{% if tag[0] == "zeep" %}

<ul>

{% for post in tag[1] %}

<li><a href="{{ post.url }}">{{ post.title }}</a></li>

{% endfor %}

</ul>

{% endif %}

{% endfor %}