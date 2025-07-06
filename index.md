---
layout: default
author_profile: false
---

<style>
.hero-bg {
  position: relative;
  width: 100%;
  height: calc(100vh - 88.9px - 42.6px);
  background: url('/assets/images/hero1.webp') center center/cover no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  padding-top: 7em;
}

.hero-logo {
  width: 100%;
  max-width: 230px;
  max-height: 80vh;
  height: auto;
  z-index: 2;
}

.hero-name {
  margin-top: 0em;
  font-family: 'EB Garamond', serif;
  font-size: 3.5rem;
  font-weight: 540;
  letter-spacing: 0.14em;
  color: #343434;
  text-shadow: 0 0px 40px rgba(255,255,255,0.3);
  text-align: center;
  line-height: 1.4;
}

body {
  overflow-x: hidden;
}

.page__footer {
  margin: 0;
}

@media (max-width: 600px) {
  .hero-bg {
    height: calc(100vh - 64.9px - 31px);
    padding-top: 3em;
  }
  .hero-logo {
    max-width: 140px;
  }
  .hero-name {
    font-size: 3rem;
    letter-spacing: 0.08em;
    line-height: 1.2;
  }
}
</style>

<div class="hero-bg">
  <img class="hero-logo" src="/assets/images/makersmark343434.svg" alt="Logo">
  <div class="hero-name">Arthur Kortekaas</div>
</div>