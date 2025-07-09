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

<div class="intro-text" style="max-width: 600px; margin: 2em auto 0 auto; text-align: center; font-size: 1.2em;">
  Welcome! I’m Arthur, a passionate hobbyist soapmaker and craft enthusiast. Here you’ll find my adventures in handmade soap, leatherwork, 3D printing, sewing, and more. I also share personal stories and reflections as someone living with autism. Whether you’re curious about my soaps or just enjoy creative projects, I hope you find something inspiring here!
</div>

<div style="display: flex; justify-content: center; margin-top: 2em;">
  <a href="/soap/" class="soap-cta" style="background: #afa58f; color: #fff; padding: 1em 2em; border-radius: 8px; font-size: 1.3em; text-decoration: none; box-shadow: 0 2px 8px rgba(0,0,0,0.08); transition: background 0.2s;">
    🧼 Discover My Handmade Soaps
  </a>
</div>

