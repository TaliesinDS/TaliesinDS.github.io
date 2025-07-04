let currentLang = 'nl'; // or 'en' as default

function toggleLang() {
  const enBlocks = document.querySelectorAll('.lang-en');
  const nlBlocks = document.querySelectorAll('.lang-nl');
  // Select the visible button and flag
  const toggleBtn = document.querySelector('.lang-content:not([style*="display: none"]) .lang-toggle');
  const flag = document.querySelector('.lang-content:not([style*="display: none"]) .lang-flag');
  if (currentLang === 'nl') {
    nlBlocks.forEach(el => el.style.display = 'none');
    enBlocks.forEach(el => el.style.display = 'block');
    if (flag) {
      flag.src = "/assets/images/ui/nl.svg";
      flag.alt = "Dutch flag";
    }
    currentLang = 'en';
  } else {
    nlBlocks.forEach(el => el.style.display = 'block');
    enBlocks.forEach(el => el.style.display = 'none');
    if (flag) {
      flag.src = "/assets/images/ui/gb.svg";
      flag.alt = "English flag";
    }
    currentLang = 'nl';
  }
}