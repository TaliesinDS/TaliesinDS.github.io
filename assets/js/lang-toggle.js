let currentLang = 'en';
function toggleLang() {
  const enBlocks = document.querySelectorAll('.lang-en');
  const nlBlocks = document.querySelectorAll('.lang-nl');
  if (currentLang === 'en') {
    enBlocks.forEach(el => el.style.display = 'none');
    nlBlocks.forEach(el => el.style.display = 'block');
    document.getElementById('lang-toggle').textContent = 'English';
    currentLang = 'nl';
  } else {
    enBlocks.forEach(el => el.style.display = 'block');
    nlBlocks.forEach(el => el.style.display = 'none');
    document.getElementById('lang-toggle').textContent = 'Nederlands';
    currentLang = 'en';
  }
}