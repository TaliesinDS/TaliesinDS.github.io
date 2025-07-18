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

<style>
/* Minimal styling for test, based on _includes/comments.html after line 181 */
.comments--testpage { max-width: 700px; margin: 2em auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px #0001; padding: 2em; }
.comments-title { font-size: 1.5em; margin-bottom: 1em; }
.comments-auth { margin-bottom: 1em; }
.comment-form { margin-bottom: 1.5em; }
.comment-form-textarea { width: 100%; border-radius: 4px; border: 1px solid #ccc; padding: 0.5em; margin-bottom: 0.5em; }
.btn { padding: 0.5em 1.2em; border: none; border-radius: 4px; cursor: pointer; font-size: 1em; }
.btn--primary { background: #007bff; color: #fff; }
.btn--danger { background: #dc3545; color: #fff; }
.comment-list { margin-top: 1em; }
.comment { display: flex; align-items: flex-start; margin-bottom: 1.2em; flex-direction: column;}
.comment-avatar-wrap { margin-right: 0.8em; }
.comment-avatar { width: 40px; height: 40px; border-radius: 50%; }
.comment-body { flex: 1; }
.comment-meta { font-size: 0.95em; color: #555; margin-bottom: 0.2em; }
.comment-author { font-weight: bold; }
.comment-date { margin-left: 0.5em; color: #888; font-size: 0.9em; }
.comment-text { font-size: 1.1em; }
.no-comments { color: #888; text-align: center; margin: 2em 0; }
</style>


