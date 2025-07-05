---
layout: default
author_profile: false
---
<style>

.hero-bg {
  position: relative;
  width: 100%;              /* Changed from 100vw */
  height: 90vh;
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