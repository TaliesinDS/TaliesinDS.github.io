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

Dit is de samenvatting of inleiding van je post.
<!--more-->
<style>
.page__content > p:first-child {
  display: none;
}
</style>

<div class="lang-content lang-nl" style="display:none;">
  <div class="lang-header">
    <h2 style="margin: 0.5em 0 0.5em;">Over mij</h2>
    <div class="lang-switcher">
      <button id="lang-toggle" onclick="toggleLang()">
        <img id="lang-flag" src="/assets/images/ui/gb.svg" alt="English flag">
      </button>
    </div>
  </div>
  <p>Hallo! Mijn naam is Arthur...</p>
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
  <p>Hello! My name is Arthur...</p>
</div>

