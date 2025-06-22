---
permalink: /soap/
title: "Handgemaakte Zeep"
layout: single
author_profile: true
---
![zeep verpakkingen](/assets/images/zeep1.jpg "mooie zeepjes")
informatie over de zeep die ik maak.

{% for tag in site.tags %}

{% if tag[0] == "zeep" %}

<ul style="list-style-type: none;">

{% for post in tag[1] %}

<li><a href="{{ post.url }}">{{ post.title }}</a>
{{ post.excerpt }}
</li>

{% endfor %}

</ul>

{% endif %}

{% endfor %}

