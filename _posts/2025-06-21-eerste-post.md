---
title: "Eerste post"
layout: single
author_profile: true
tags: post
excerpt_separator: <!--more-->
header:
 overlay_image: /assets/images/banner02.png
 overlay_filter: 0.2
comments: true
---
eerste post test. <!--more-->

![test image of a bull]({{page.image}})

<form action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSd-xZgVsbuQsLumpP_W1u97vPG7RbR9_awZ3XDQTpXegkB1XA/formResponse" method="POST">
  <label for="name">Name:</label><br>
  <input type="text" id="name" name="entry.1922964266" required><br><br>
  
  <label for="email">Email:</label><br>
  <input type="email" id="email" name="entry.1297944239" required><br><br>

 <label for="comment">Comment:</label><br>
  <input type="text" id="comment" name="entry.503498009" required><br><br>
   
  <button type="submit">Submit</button>
</form>

<div id="note-section">
    <h2 class="post-subtitle">Add Your Note</h2>
    <div id="noteSection" class="notes">
        <div id="notes-list" class="post-info">
            <noscript>This requires JavaScript to function properly. Please enable JavaScript in your browser settings</noscript>
        </div>
    </div>
    <div class="notes">
        <div class="post-info">
            <p></p>
        </div>
        <div class="notes-form">
            <form id="note-form">
                <input id="note-name" name="username" type="text" placeholder="Name" required autocomplete="username">
                <textarea id="note-content" name="note" placeholder="Type Here..." required></textarea>
                <input id="note-submit" type="submit" value="Post">
            </form>
        </div>
    </div>
</div>