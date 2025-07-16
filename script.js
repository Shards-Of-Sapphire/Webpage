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
  
  emailjs.init("QQDJd47aK0ayMcPOW");

  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const loader = document.getElementById('submitLoader');
    const formStatus = document.getElementById('formStatus');
    loader.style.display = 'inline-block';
    formStatus.innerHTML = '';
    formStatus.className = 'form-status';

    emailjs.sendForm('service_7qqgy6l', 'template_sl50o2d', this)
      .then(() => {
        loader.style.display = 'none';
        formStatus.innerHTML = 'Message sent successfully!';
        formStatus.className = 'form-status success-message';
        this.reset();
      }, (error) => {
        loader.style.display = 'none';
        formStatus.innerHTML = 'Failed to send message. Try again later.';
        formStatus.className = 'form-status error-message';
        console.error('EmailJS Error:', error);
      });
    });


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
  
  // Contact Form Submission with EmailJS
  document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const loader = document.getElementById('submitLoader');
  const formStatus = document.getElementById('formStatus');
  loader.style.display = 'inline-block';
  formStatus.innerHTML = '';
  formStatus.className = 'form-status';

  emailjs.sendForm('service_7qqgy6l', 'template_sl50o2d', this)
    .then(() => {
      loader.style.display = 'none';
      formStatus.innerHTML = 'Message sent successfully!';
      formStatus.className = 'form-status success-message';
      this.reset();
    }, (error) => {
      loader.style.display = 'none';
      formStatus.innerHTML = 'Failed to send message. Try again later.';
      formStatus.className = 'form-status error-message';
      console.error('EmailJS Error:', error);
    });
});

});

window.addEventListener("load", () => {
  const landing = document.getElementById("landing-page");
  if (landing) {
    landing.scrollIntoView({ behavior: "instant" }); // Use 'smooth' if you want animation
  }
});

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
