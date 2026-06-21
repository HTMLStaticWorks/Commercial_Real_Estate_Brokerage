/**
 * Main JavaScript File
 * Commercial Real Estate Brokerage
 */

// Force scroll to top on page reload/refresh
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);
window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

document.addEventListener('DOMContentLoaded', () => {
  initThemeAndLayout();
  initNavbarScroll();
  initBackToTop();
  initFormValidation();
  highlightActiveLink();
});

/**
 * Initialize Light/Dark theme and LTR/RTL layout from local storage or defaults
 */
function initThemeAndLayout() {
  const headerThemeToggle = document.getElementById('theme-toggle');
  const headerRtlToggle = document.getElementById('rtl-toggle');
  const offcanvasBody = document.querySelector('#offcanvasNavbar .offcanvas-body');

  // If we are in the main pages (with header offcanvas navbar)
  if (offcanvasBody && headerThemeToggle && headerRtlToggle) {
    // 1. Hide the original header buttons on mobile/tablet (below xl breakpoint)
    headerThemeToggle.classList.add('d-none', 'd-xl-inline-block');
    headerRtlToggle.classList.add('d-none', 'd-xl-inline-block');

    // 2. Create the mobile container inside offcanvas-body if not already there
    let mobileControls = document.getElementById('mobile-offcanvas-controls');
    if (!mobileControls) {
      mobileControls = document.createElement('div');
      mobileControls.id = 'mobile-offcanvas-controls';
      mobileControls.className = 'd-flex d-xl-none gap-2 mt-3 justify-content-center border-top pt-3 w-100';

      // Clone theme toggle button
      const mobileThemeBtn = headerThemeToggle.cloneNode(true);
      mobileThemeBtn.removeAttribute('id');
      mobileThemeBtn.className = 'btn btn-outline-custom btn-custom py-2 px-3 theme-toggle';
      mobileThemeBtn.innerHTML = '<i class="fa-solid fa-moon fs-5"></i>';

      // Clone RTL toggle button
      const mobileRtlBtn = headerRtlToggle.cloneNode(true);
      mobileRtlBtn.removeAttribute('id');
      mobileRtlBtn.className = 'btn btn-outline-custom btn-custom py-2 px-3 rtl-toggle';
      mobileRtlBtn.innerHTML = '<span>RTL</span>';

      mobileControls.appendChild(mobileThemeBtn);
      mobileControls.appendChild(mobileRtlBtn);

      // Insert before mobile CTA buttons or at the end of offcanvas-body
      const mobileCta = offcanvasBody.querySelector('.d-sm-none');
      if (mobileCta) {
        offcanvasBody.insertBefore(mobileControls, mobileCta);
      } else {
        offcanvasBody.appendChild(mobileControls);
      }
    }
  }

  // Bind event listeners to ALL theme and RTL toggle buttons
  const themeToggleBtns = document.querySelectorAll('#theme-toggle, .theme-toggle');
  const rtlToggleBtns = document.querySelectorAll('#rtl-toggle, .rtl-toggle');

  // Load saved configurations
  const currentTheme = localStorage.getItem('theme') || 'light';
  const currentLayout = localStorage.getItem('layout') || 'ltr';

  // Apply values
  document.documentElement.setAttribute('data-bs-theme', currentTheme);
  document.documentElement.setAttribute('dir', currentLayout);
  
  // Update stylesheet if Bootstrap RTL is needed
  updateBootstrapCDN(currentLayout);

  themeToggleBtns.forEach(themeToggleBtn => {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-bs-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-bs-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  });

  rtlToggleBtns.forEach(rtlToggleBtn => {
    rtlToggleBtn.addEventListener('click', () => {
      const activeLayout = document.documentElement.getAttribute('dir');
      const newLayout = activeLayout === 'rtl' ? 'ltr' : 'rtl';
      document.documentElement.setAttribute('dir', newLayout);
      localStorage.setItem('layout', newLayout);
      updateBootstrapCDN(newLayout);
    });
  });
}

/**
 * Switch Bootstrap CDN dynamically to support native RTL rules
 */
function updateBootstrapCDN(layout) {
  const bootstrapLink = document.getElementById('bootstrap-cdn');
  if (!bootstrapLink) return;

  if (layout === 'rtl') {
    bootstrapLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css';
  } else {
    bootstrapLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
  }
}

/**
 * Adds a background class to the navigation bar when user scrolls down
 */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar-custom');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('shadow-sm', 'py-2');
    } else {
      navbar.classList.remove('shadow-sm', 'py-2');
    }
  });
}

/**
 * Back to top button logic
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Standard client-side Bootstrap form validation with custom warnings
 */
function initFormValidation() {
  const forms = document.querySelectorAll('.needs-validation');

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        alert('Thank you! Your request has been successfully submitted.');
        form.reset();
      }
      form.classList.add('was-validated');
    }, false);
  });
}

/**
 * Highlight the currently active page in navigation menu
 */
function highlightActiveLink() {
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';
  
  const navLinks = document.querySelectorAll('.nav-link-custom');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
