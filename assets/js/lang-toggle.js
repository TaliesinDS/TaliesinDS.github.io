let currentLang = 'nl';

function toggleLang() {
  const enBlocks = document.querySelectorAll('.lang-en');
  const nlBlocks = document.querySelectorAll('.lang-nl');
  const flags = document.querySelectorAll('.lang-flag');
  if (currentLang === 'nl') {
    nlBlocks.forEach(el => el.style.display = 'none');
    enBlocks.forEach(el => el.style.display = 'block');
    flags.forEach(flag => {
      flag.src = "/assets/images/ui/nl.svg";
      flag.alt = "Dutch flag";
    });
    currentLang = 'en';
  } else {
    nlBlocks.forEach(el => el.style.display = 'block');
    enBlocks.forEach(el => el.style.display = 'none');
    flags.forEach(flag => {
      flag.src = "/assets/images/ui/gb.svg";
      flag.alt = "English flag";
    });
    currentLang = 'nl';
  }
}