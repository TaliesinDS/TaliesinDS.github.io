---
title: "2 Talige Versie Test Post"
layout: single
author_profile: true
tags: post taal test
excerpt_separator: <!--more-->
header:
    overlay_image: random
    overlay_filter: 0.3
    teaser: /assets/images/bull200px.webp
comments: true
---

<div class="lang-switcher">
  <button onclick="showLang('en')">English</button>
  <button onclick="showLang('nl')">Nederlands</button>
</div>

<div class="lang-content lang-en">
  <h2>About Me</h2>
  <p>Hello! My name is Arthur...</p>
</div>

<div class="lang-content lang-nl" style="display:none;">
  <h2>Over mij</h2>
  <p>Hallo! Mijn naam is Arthur...</p>
</div>

<script>
function showLang(lang) {
  document.querySelector('.lang-en').style.display = (lang === 'en') ? 'block' : 'none';
  document.querySelector('.lang-nl').style.display = (lang === 'nl') ? 'block' : 'none';
}
</script>