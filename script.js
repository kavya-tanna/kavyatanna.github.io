/* =============================================
   Kavya Tanna — Portfolio
   script.js  |  Common JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* --------------------------------------------------
     1. NAVBAR — highlight active page link
     -------------------------------------------------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(function (link) {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  /* --------------------------------------------------
     2. CONTACT FORM — validate & show success alert
     -------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name  = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();

      // Basic validation
      if (!name || !email) {
        showAlert('⚠️ Please fill in all fields before submitting.', 'warning');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showAlert('⚠️ Please enter a valid email address.', 'warning');
        return;
      }

      // Success
      showAlert('✅ Form submitted successfully! Thank you, ' + name + '. I will get back to you soon.', 'success');
      contactForm.reset();
    });
  }

  /* --------------------------------------------------
     3. HELPER — custom alert box injected below form
     -------------------------------------------------- */
  function showAlert(message, type) {
    const existing = document.getElementById('customAlert');
    if (existing) existing.remove();

    const alertBox = document.createElement('div');
    alertBox.id = 'customAlert';

    const isSuccess = type === 'success';
    alertBox.style.cssText = `
      background: ${isSuccess ? '#f0faf4' : '#fff9ec'};
      color:      ${isSuccess ? '#1a5e38' : '#7a4d00'};
      border:     1.5px solid ${isSuccess ? '#7dd3a8' : '#f0c060'};
      border-radius: 10px;
      padding: 14px 20px;
      margin-top: 18px;
      font-family: 'Jost', sans-serif;
      font-size: 0.93rem;
      font-weight: 500;
      opacity: 0;
      transform: translateY(10px);
      transition: opacity 0.3s ease, transform 0.3s ease;
    `;
    alertBox.textContent = message;

    const form = document.getElementById('contactForm');
    if (form) form.insertAdjacentElement('afterend', alertBox);

    // Animate in
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        alertBox.style.opacity = '1';
        alertBox.style.transform = 'translateY(0)';
      });
    });

    // Auto-remove after 5 s
    setTimeout(function () {
      alertBox.style.opacity = '0';
      alertBox.style.transform = 'translateY(-8px)';
      setTimeout(function () { alertBox.remove(); }, 350);
    }, 5000);
  }

  /* --------------------------------------------------
     4. NAVBAR — close mobile menu on link click
     -------------------------------------------------- */
  const navbarCollapse = document.querySelector('#navbarNav');
  const navbarToggler  = document.querySelector('.navbar-toggler');
  if (navbarCollapse) {
    navbarCollapse.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        if (navbarToggler && getComputedStyle(navbarToggler).display !== 'none') {
          if (typeof bootstrap !== 'undefined') {
            const bsCol = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCol) bsCol.hide();
          }
        }
      });
    });
  }

  /* --------------------------------------------------
     5. SCROLL HINT — fade out on scroll
     -------------------------------------------------- */
  const scrollHint = document.querySelector('.scroll-hint');
  if (scrollHint) {
    window.addEventListener('scroll', function () {
      scrollHint.style.opacity  = window.scrollY > 60 ? '0' : '1';
      scrollHint.style.transition = 'opacity 0.4s';
    });
  }

}); // end DOMContentLoaded
