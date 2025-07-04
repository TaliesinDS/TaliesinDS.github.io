let currentLang = 'en';
function toggleLang() {
  const enBlocks = document.querySelectorAll('.lang-en');
  const nlBlocks = document.querySelectorAll('.lang-nl');
  const flag = document.getElementById('lang-flag');
  if (currentLang === 'en') {
    enBlocks.forEach(el => el.style.display = 'none');
    nlBlocks.forEach(el => el.style.display = 'block');
    flag.src = "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1fa-1f1f8.svg"; // English flag (US)
    flag.alt = "English flag";
    currentLang = 'nl';
  } else {
    enBlocks.forEach(el => el.style.display = 'block');
    nlBlocks.forEach(el => el.style.display = 'none');
    flag.src = "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1ec-1f1e7.svg"; // Dutch flag (NL)
    flag.alt = "Dutch flag";
    currentLang = 'en';
  }
}