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

.hero-subtitle {
  position: absolute;
  left: 50%;
  top: 55%;
  transform: translate(-50%, -50%);
  max-width: 80%;
  text-align: center;
  font-size: 1.6em;
  background: rgba(243,243,243,0.60);
  color: #343434;
  padding: 0.25em 1em;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  font-style: italic;
  font-family: 'EB Garamond', serif;
  z-index: 3;
}

@media (max-width: 600px) {
  .hero-subtitle {
    display: none;
  }
}

@media (min-width: 601px) and (max-width: 1100px) {
  .hero-subtitle {
    top: 60%;
    font-size: 1.2em;
    padding: 0.25em 0.5em;
  }
}

/* Galaxy Tab S8 Plus landscape viewport: 1680x907 */
@media (min-width: 1100px) and (max-width: 1700px) and (min-aspect-ratio: 16/9) and (max-aspect-ratio: 2/1) {
  .hero-subtitle {
    top: 62%;
    font-size: 1.3em;
    padding: 0.25em 0.7em;
  }
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
<div class="hero-subtitle">
  Welkom! Ik ben Arthur, een gepassioneerde hobby zeepmaker en liefhebber van ambachtelijk handwerk.
</div>
</div>

   <div class="intro-text" style="max-width: 80%; margin: 2em auto 0 auto; text-align: center; font-size: 1.2em;">
     Welkom! Ik ben Arthur, een gepassioneerde hobby zeepmaker en liefhebber van ambachtelijk handwerk. Op deze site vind je mijn avonturen met handgemaakte zeep, 3D-printen, leerbewerking, naaien en meer. Ook deel ik persoonlijke verhalen en reflecties als iemand met autisme. Of je nu nieuwsgierig bent naar mijn zepen of gewoon van creatieve projecten houdt, ik hoop dat je hier iets inspirerends vindt!
  </div>

<div style="display: flex; justify-content: center; margin-top: 2em;">
  <a href="/soap/" class="soap-cta" style="background: #afa58f; color: #fff; padding: 1em 2em; border-radius: 8px; font-size: 1.3em; text-decoration: none; box-shadow: 0 2px 8px rgba(0,0,0,0.08); transition: background 0.2s; margin: 2em 0 1.5em;">
    Ontdek mijn handgemaakte zepen
  </a>
</div>

