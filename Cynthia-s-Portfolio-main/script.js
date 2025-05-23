document.addEventListener("DOMContentLoaded", () => {
  // Hamburger Menu Toggle with Animation
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const links = document.querySelectorAll(".nav-link");
  let isMenuOpen = false;

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      isMenuOpen = !isMenuOpen;
      navLinks.classList.toggle("active");
      hamburger.innerHTML = isMenuOpen ? "×" : "☰";

      // Animate hamburger
      hamburger.style.transform = isMenuOpen ? "rotate(90deg)" : "rotate(0)";

      // Prevent body scroll when menu is open
      document.body.style.overflow = isMenuOpen ? "hidden" : "auto";

      // Close menu when clicking a link
      links.forEach((link) => {
        link.addEventListener("click", () => {
          navLinks.classList.remove("active");
          hamburger.innerHTML = "☰";
          hamburger.style.transform = "rotate(0)";
          document.body.style.overflow = "auto";
          isMenuOpen = false;
        });
      });
    });
  } else {
    console.error("Hamburger or nav-links not found in the DOM");
  }

  // Theme Switcher with Enhanced Animation
  const themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");

      // Animate icon switch
      themeToggle.style.transform = "rotate(360deg) scale(0.5)";
      setTimeout(() => {
        themeToggle.innerHTML = document.body.classList.contains("light-mode")
          ? '<i class="fas fa-sun"></i>'
          : '<i class="fas fa-moon"></i>';
        themeToggle.style.transform = "rotate(0) scale(1)";
      }, 150);
    });
  } else {
    console.error("Theme toggle not found in the DOM");
  }

  // Typewriter Effect
  const typewriterText = ["A Graphic Designer", "A Web Developer"];
  let i = 0;
  let j = 0;
  let currentText = "";
  let isDeleting = false;

  const typewriter = document.getElementById("typewriter");
  if (typewriter) {
    function type() {
      currentText = typewriterText[i];
      if (isDeleting) {
        typewriter.textContent = currentText.substring(0, j--);
        if (j < 0) {
          isDeleting = false;
          i = (i + 1) % typewriterText.length;
        }
      } else {
        typewriter.textContent = currentText.substring(0, j++);
        if (j > currentText.length) {
          isDeleting = true;
          setTimeout(type, 1000);
          return;
        }
      }
      setTimeout(type, isDeleting ? 50 : 100);
    }
    type();
  } else {
    console.error("Typewriter element not found in the DOM");
  }

  // Name Reveal on Hover
  const nameReveal = document.getElementById("name-reveal");
  if (nameReveal) {
    nameReveal.parentElement.addEventListener("mouseenter", () => {
      nameReveal.classList.add("hovered");
    });
    nameReveal.parentElement.addEventListener("mouseleave", () => {
      nameReveal.classList.remove("hovered");
    });
  } else {
    console.error("Name reveal element not found in the DOM");
  }

  // Polygonal Background Effect
  const canvas = document.getElementById("poly-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let width, height;
    let dots = [];

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initDots();
    }

    function initDots() {
      dots = [];
      const numDots = Math.floor((width * height) / 15000); // Adjust density
      for (let i = 0; i < numDots; i++) {
        dots.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5, // Slow movement
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Draw dots
      ctx.fillStyle = "rgba(255, 111, 97, 0.8)"; // Matches #ff6f61
      dots.forEach((dot) => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fill();

        // Update position
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Bounce off edges
        if (dot.x < 0 || dot.x > width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > height) dot.vy *= -1;
      });

      // Draw lines between nearby dots
      ctx.strokeStyle = "rgba(212, 165, 255, 0.2)"; // Matches #d4a5ff
      ctx.lineWidth = 1;
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            // Connect if closer than 100px
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    draw();
  } else {
    console.error("Canvas element not found in the DOM");
  }

  // Portfolio Filters
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  if (filterButtons.length && portfolioItems.length) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.getAttribute("data-filter");
        portfolioItems.forEach((item) => {
          const category = item.getAttribute("data-category");
          item.style.display =
            filter === "all" || category === filter ? "block" : "none";
        });
      });
    });
  } else {
    console.error("Filter buttons or portfolio items not found in the DOM");
  }

  // Lightbox Functionality
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");

  if (lightbox && lightboxImg && lightboxCaption) {
    window.openLightbox = function (imgSrc, caption) {
      lightboxImg.src = imgSrc;
      lightboxCaption.textContent = caption;
      lightbox.classList.add("active");
    };

    window.closeLightbox = function () {
      lightbox.classList.remove("active");
    };
  } else {
    console.error("Lightbox elements not found in the DOM");
  }

  // Custom Cursor
  const cursor = document.querySelector(".custom-cursor");
  if (cursor) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = `${e.clientX - 10}px`;
      cursor.style.top = `${e.clientY - 10}px`;
    });

    document
      .querySelectorAll(".portfolio-item, .nav-link, .btn")
      .forEach((el) => {
        el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
        el.addEventListener("mouseleave", () =>
          cursor.classList.remove("hover")
        );
      });
  } else {
    console.error("Custom cursor element not found in the DOM");
  }

  // Form Submission (Basic Alert)
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you for your message, Cynthia will get back to you soon!");
      form.reset();
    });
  } else {
    console.error("Contact form not found in the DOM");
  }

  // Smooth Scroll for Nav Links
  const anchors = document.querySelectorAll('a[href^="#"]');
  if (anchors.length) {
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        });
      });
    });
  } else {
    console.error("No smooth scroll anchors found in the DOM");
  }
});
