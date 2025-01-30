/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

// Scroll işlemlerini debounce ile optimize edelim
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const sections = [
  "about",
  "experience",
  "projects",
  "internships",
  "education",
  "skills",
  "awards",
];

const scrollToNextSection = debounce((currentSectionId) => {
  const currentIndex = sections.indexOf(currentSectionId);
  if (currentIndex < sections.length - 1) {
    const nextSection = document.getElementById(sections[currentIndex + 1]);
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  }
}, 150);

// Sayfa yüklendiğinde scroll pozisyonunu sıfırla
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});

document.addEventListener('DOMContentLoaded', () => {
  // Bootstrap ScrollSpy'ı başlat
  const scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: '#navbarResponsive',
    offset: 100
  });

  // Responsive navbar collapse işlemi
  const navbarToggler = document.querySelector('.navbar-toggler');
  const responsiveNavItems = document.querySelectorAll('#navbarResponsive .nav-link');
  
  responsiveNavItems.forEach((item) => {
    item.addEventListener('click', () => {
      if (window.getComputedStyle(navbarToggler).display !== 'none') {
        navbarToggler.click();
      }
    });
  });
});

// Service Worker kaydı
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful');
      })
      .catch(err => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}
