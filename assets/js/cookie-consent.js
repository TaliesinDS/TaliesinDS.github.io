// Cookie consent and analytics loader for Minimal Mistakes Jekyll theme
(function() {
  var banner = document.getElementById('cookie-consent-banner');
  var acceptBtn = document.getElementById('cookie-accept-btn');
  var consentKey = 'cookie_consent_accepted';

  function hideBanner() {
    if (banner) banner.style.display = 'none';
  }

  function showBanner() {
    if (banner) banner.style.display = 'block';
  }

  function setConsent() {
    try {
      localStorage.setItem(consentKey, 'yes');
    } catch (e) {}
  }

  function hasConsent() {
    try {
      return localStorage.getItem(consentKey) === 'yes';
    } catch (e) { return false; }
  }

  function loadAnalytics() {
    if (window.gtagScriptLoaded) return;
    window.gtagScriptLoaded = true;
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-CMXJSHVBGZ';
    document.head.appendChild(script);
    script.onload = function() {
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', 'G-CMXJSHVBGZ');
    };
  }

  if (hasConsent()) {
    hideBanner();
    loadAnalytics();
  } else {
    showBanner();
    if (acceptBtn) {
      acceptBtn.addEventListener('click', function() {
        setConsent();
        hideBanner();
        loadAnalytics();
      });
    }
  }
})();
