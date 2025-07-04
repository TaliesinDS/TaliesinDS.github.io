let currentLang = 'nl';

function toggleLang() {
  const enBlocks = document.querySelectorAll('.lang-en');
  const nlBlocks = document.querySelectorAll('.lang-nl');
  const flag = document.querySelector('.lang-flag'); // Only one switcher per page

  // Use computed style to check which language is currently visible
  // (Optional: if you want to auto-detect instead of using currentLang variable)
  // const nlVisible = nlBlocks.length && window.getComputedStyle(nlBlocks[0]).display !== "none";

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

// Optional: On page load, ensure only the correct language is visible
document.addEventListener('DOMContentLoaded', function() {
  const enBlocks = document.querySelectorAll('.lang-en');
  const nlBlocks = document.querySelectorAll('.lang-nl');
  if (currentLang === 'nl') {
    nlBlocks.forEach(el => el.style.display = 'block');
    enBlocks.forEach(el => el.style.display = 'none');
  } else {
    nlBlocks.forEach(el => el.style.display = 'none');
    enBlocks.forEach(el => el.style.display = 'block');
  }
});