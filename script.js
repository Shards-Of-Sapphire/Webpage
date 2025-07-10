// Update year in footer
document.addEventListener('DOMContentLoaded', function() {
  const currentYear = new Date().getFullYear();
  const yearElements = document.querySelectorAll('#year, #year-home');
  yearElements.forEach(element => {
    element.textContent = currentYear;
  });
  
  // Check localStorage for the current page state when the page loads
  const currentPage = localStorage.getItem('currentPage');
  
  if (currentPage === 'home') {
    document.getElementById('landing-page').style.display = 'none';
    document.getElementById('home-page').style.display = 'block';
  } else {
    document.getElementById('landing-page').style.display = 'block';
    document.getElementById('home-page').style.display = 'none';
  }
  
  // Begin Journey Button - Show Home Page
  document.getElementById('begin-journey').addEventListener('click', function() {
    document.getElementById('landing-page').style.display = 'none';
    document.getElementById('home-page').style.display = 'block';
    // Save the current page state in localStorage
    localStorage.setItem('currentPage', 'home');
    window.scrollTo(0, 0);
  });
  
  // Return to Landing Page
  document.getElementById('return-to-landing').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('landing-page').style.display = 'block';
    // Save the current page state in localStorage
    localStorage.setItem('currentPage', 'landing');
    window.scrollTo(0, 0);
  });
  
  // Back to Top Button
  const backToTopButton = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  });
  
  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.getAttribute('href') === '#') return;
      
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Contact Form Submission with PHP
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show loader
      const loader = document.getElementById('submitLoader');
      loader.style.display = 'inline-block';
      
      // Hide any previous status messages
      const formStatus = document.getElementById('formStatus');
      formStatus.innerHTML = '';
      formStatus.className = 'form-status';
      
      // Collect form data
      const formData = new FormData(this);
      
      // Send data to the PHP script
      fetch('send-email.php', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.status);
        }
        return response.text();
      })
      .then(data => {
        // Hide loader
        loader.style.display = 'none';
        
        // Show success message
        formStatus.innerHTML = data;
        formStatus.className = 'form-status success-message';
        
        // Reset the form
        contactForm.reset();
      })
      .catch(error => {
        // Hide loader
        loader.style.display = 'none';
        
        // Show error message
        formStatus.innerHTML = 'There was a problem sending your message. Please try again later.';
        formStatus.className = 'form-status error-message';
        
        console.error('Error:', error);
      });
    });
  }
});