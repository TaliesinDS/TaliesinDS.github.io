let currentLang = 'nl';
function toggleLang() {
  const enBlocks = document.querySelectorAll('.lang-en');
  const nlBlocks = document.querySelectorAll('.lang-nl');
  const flag = document.getElementById('lang-flag');
  if (currentLang === 'en') {
    enBlocks.forEach(el => el.style.display = 'none');
    nlBlocks.forEach(el => el.style.display = 'block');
    flag.src = "/assets/images/ui/gb.svg"; // English flag (US)
    flag.alt = "English";
    currentLang = 'nl';
  } else {
    enBlocks.forEach(el => el.style.display = 'block');
    nlBlocks.forEach(el => el.style.display = 'none');
    flag.src = "/assets/images/ui/nl.svg"; // Dutch flag (NL)
    flag.alt = "Dutch";
    currentLang = 'en';
  }
}