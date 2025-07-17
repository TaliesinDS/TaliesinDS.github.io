# Save this as new-jekyll-post.ps1 in your repo root and run with: powershell -ExecutionPolicy Bypass -File .\new-jekyll-post.ps1

$postsDir = "_posts"
if (!(Test-Path $postsDir)) { New-Item -ItemType Directory -Path $postsDir | Out-Null }

$title = Read-Host "Enter post title"
$slug = $title.ToLower() -replace '[^a-z0-9\s-]', '' -replace '\s+', '-' -replace '-+', '-'
$date = Get-Date -Format "yyyy-MM-dd"
$filename = "$postsDir\$date-$slug.md"
$teaser = "/assets/images/bull200px.webp" # Default teaser image

$postContent = @"
---
title: "$title"
layout: single
author_profile: true
tags: 
excerpt_separator: <!--more-->
header:
    overlay_image: random
    overlay_filter: 0.3
    teaser: $teaser
comments: true
---
<div class="body-post-excerpt">
  <p class="body-excerpt-title">$title</p>
</div>
<!--more-->
<style>
.page__content > .body-post-excerpt {
  display: none;
}
</style>

<div class="lang-content lang-nl">
  <div class="lang-header">
    <h2 style="margin: 0.5em 0 0.5em;">$title</h2>
    <div class="lang-switcher">
      <button id="lang-toggle" onclick="toggleLang()">
        <img id="lang-flag" src="/assets/images/ui/gb.svg" alt="English flag">
      </button>
    </div>
  </div>
  <!-- Schrijf hier je Nederlandse tekst -->
</div>

<div class="lang-content lang-en" style="display:none;">
  <div class="lang-header">
    <h2 style="margin: 0.5em 0 0.5em;">$title</h2>
    <div class="lang-switcher">
      <button id="lang-toggle" onclick="toggleLang()">
        <img id="lang-flag" src="/assets/images/ui/nl.svg" alt="Dutch flag">
      </button>
    </div>
  </div>
  <!-- Write your English text here -->
</div>
"@

$postContent | Out-File -Encoding UTF8 $filename

Write-Host "Created $filename"