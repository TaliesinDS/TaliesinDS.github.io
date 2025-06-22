---
permalink: /projects/
title: "andere dingen"
layout: single
author_profile: true
---
![zeep verpakkingen](/assets/images/zeep1.jpg "mooie zeepjes")
Andere dingen waar ik mee bezig ben

{% for tag in site.tags %}

{% if tag[0] != "zeep" %}

<ul style="list-style-type: none;">

{% for post in tag[1] %}

<li><a href="{{ post.url }}">{{ post.title }}</a></li>

{% endfor %}

</ul>

{% endif %}

{% endfor %}

