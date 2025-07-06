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
  flex-direction: column;      /* Add this line */
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  padding-top: 7em;
}

.hero-logo {
  width: 100%;              /* Let it scale with the container */
  max-width: 230px;         /* Adjust as needed */
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
    padding-top: 3em;
  }
  .hero-logo {
    max-width: 140px;
  }
  .hero-name {
    font-size: 3rem;
    letter-spacing: 0.08em;
    margin-top: 0em;
    line-height: 1.2;
    font-weight: 540;
  }
}
</style>

<div class="hero-bg">
  <img class="hero-logo" src="/assets/images/makersmark343434.svg" alt="Logo">
  <div class="hero-name">Arthur Kortekaas</div>
</div>
<style>
.hero-name {
  margin-top: 0em;
  font-family: serif;
  font-size: 3.5rem;
  font-weight: 540;
  letter-spacing: 0.14em;    /* Increase space between letters */
  color: #343434;              /* Adjust color as needed */
  text-shadow: 0 0px 40px rgba(255,255,255,0.3); /* Optional: add some contrast */
  text-align: center;
  line-height: 1.4;
}
</style>