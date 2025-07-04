let currentLang = 'nl';

function toggleLang() {
  const enBlocks = document.querySelectorAll('.lang-en');
  const nlBlocks = document.querySelectorAll('.lang-nl');
  const flag = document.querySelector('.lang-flag'); // Only one switcher per page

  if (currentLang === 'nl') {
    nlBlocks.forEach(el => el.style.display = 'none');
    enBlocks.forEach(el => el.style.display = 'block');
    if (flag) {
      flag.src = "/assets/images/ui/nl.svg";
      flag.alt = "Dutch flag";
      flag.width = 24;
      flag.height = 18;
    }
    currentLang = 'en';
  } else {
    nlBlocks.forEach(el => el.style.display = 'block');
    enBlocks.forEach(el => el.style.display = 'none');
    if (flag) {
      flag.src = "/assets/images/ui/gb.svg";
      flag.alt = "English flag";
      flag.width = 24;
      flag.height = 18;
    }
    currentLang = 'nl';
  }
}