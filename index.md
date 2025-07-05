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
  align-items: center;
  justify-content: center;
  overflow: hidden;
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
  <img class="hero-logo" src="/assets/images/ui/logobig.svg" alt="Logo">
</div>
