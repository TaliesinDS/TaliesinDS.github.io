---
title: "htmx comment system test page"
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
<div class="body-post-excerpt">
  <p class="body-excerpt-title">htmx comment system test page</p>
</div>
<!--more-->
<style>
.page__content > .body-post-excerpt {
  display: none;
}
</style>

<!-- Firebase/htmx scripts (only for this page) -->
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"></script>
<script src="https://unpkg.com/htmx.org@1.9.10"></script>
<script src="/assets/js/htmx-firebase-comments.js"></script>

<div id="firebase-comments-section" class="comments comments--testpage">
  <h3 class="comments-title">Test Comments</h3>
  <div class="comments-auth">
    <span id="firebase-user-info"></span>
    <button id="firebase-login-btn" onclick="loginWithGoogle()" class="btn btn--primary">Sign in with Google</button>
    <button id="firebase-logout-btn" onclick="logout()" class="btn btn--danger" style="display:none;">Sign out</button>
  </div>
  <form id="firebase-comment-form" style="display:none;" class="comment-form">
    <textarea name="comment" rows="3" placeholder="Write a comment..." required class="comment-form-textarea"></textarea>
    <button type="submit" class="btn btn--primary">Post Comment</button>
  </form>
  <div id="firebase-comment-list" class="comment-list"></div>
</div>

