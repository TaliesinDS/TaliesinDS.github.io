---
layout: default
author_profile: false
---
<style>


.hero-bg {
  position: relative;
  width: 100%;
  height: calc(100vh - 88.8667px - 42.6333px);
  background: url('/assets/images/hero1.webp') center center/cover no-repeat;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
  padding-top: 7em;
}

.hero-logo {
  width: 100%;              /* Let it scale with the container */
  max-width: 600px;         /* Adjust as needed */
  max-height: 80vh;         /* Prevents logo from overflowing vertically */
  height: auto;
  z-index: 2;
}

/* Prevent horizontal scroll on the whole page */
body {
  overflow-x: hidden;
}

.page__footer {
  margin: 0;
}
@media (max-width: 600px) {
  .hero-bg {
    height: calc(100vh - 64.8667px - 30.9999px);
}
  .hero-logo {
  max-width: 280px;
}
</style>

<div class="hero-bg">
  <img class="hero-logo" src="/assets/images/makersmark343434.svg" alt="Logo">
  <div class="hero-name">Arthur Kortekaas</div>
</div>
<style>
.hero-name {
  margin-top: 1.5em;
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: 0.2em;    /* Increase space between letters */
  color: $text-color;              /* Adjust color as needed */
  text-shadow: 0 2px 8px rgba(0,0,0,0.3); /* Optional: add some contrast */
  text-align: center;
}
</style>