# Save this as new-jekyll-post.ps1 in your repo root and run with: powershell -ExecutionPolicy Bypass -File .\new-jekyll-post.ps1

$postsDir = "_posts"
if (!(Test-Path $postsDir)) { New-Item -ItemType Directory -Path $postsDir | Out-Null }

$title = Read-Host "Enter post title"
$slug = $title.ToLower() -replace '[^a-z0-9\s-]', '' -replace '\s+', '-' -replace '-+', '-'
$date = Get-Date -Format "yyyy-MM-dd"
$filename = "$postsDir\$date-$slug.md"

@"
---
title: "$title"
layout: single
author_profile: true
tags: 
excerpt_separator: <!--more-->
header:
    overlay_image: random
    overlay_filter: 0.3
    teaser: /assets/images/bull200px.webp
comments: true
---

Dit is de samenvatting of inleiding van je post.
<!--more-->

<!-- Write your post content here -->
"@ | Out-File -Encoding UTF8 $filename

Write-Host "Created $filename"