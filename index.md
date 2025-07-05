---
layout: default
author_profile: false
---
<style>


.hero-bg {
  position: relative;
  width: 100%;              /* Changed from 100vw */
  calc(90vh - 2em);
  min-height: 400px;
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
</style>

<div class="hero-bg">
  <img class="hero-logo" src="/assets/images/ui/logobig.svg" alt="Logo">
</div>