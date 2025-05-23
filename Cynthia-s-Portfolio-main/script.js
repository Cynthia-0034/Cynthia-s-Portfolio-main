// Theme Switcher
const themeToggle = document.querySelector(".theme-toggle");
if (themeToggle) {
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
    themeToggle.setAttribute("aria-checked", "true");
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    const isLightMode = document.body.classList.contains("light-mode");
    themeToggle.setAttribute("aria-checked", isLightMode);
    localStorage.setItem("theme", isLightMode ? "light" : "dark");
  });

  themeToggle.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      themeToggle.click();
    }
  });
}

// Hamburger Menu
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("fa-times");
  });
}

// Smooth Scroll and Active Link
const navLinkEls = document.querySelectorAll(".nav-link");
navLinkEls.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    navLinkEls.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
    const targetId = link.getAttribute("href").substring(1);
    document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      hamburger.classList.remove("fa-times");
    }
  });
});

// Progress Bar
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.querySelector(".progress-bar").style.width = `${scrollPercent}%`;
});

// Custom Cursor
const cursor = document.querySelector(".custom-cursor");
document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

document
  .querySelectorAll("a, button, .portfolio-item, .blog-card")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
  });

// Typewriter Effect
if (document.getElementById("typewriter")) {
  const typed = new Typed("#typewriter", {
    strings: ["Web Developer", "Graphic Designer", "Creative Coder"],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true,
  });
}

// Name Reveal Animation
const nameReveal = document.getElementById("name-reveal");
if (nameReveal) {
  const text = nameReveal.textContent;
  nameReveal.innerHTML = text
    .split("")
    .map((letter) =>
      letter === " " ? " " : `<span class="letter">${letter}</span>`
    )
    .join("");

  nameReveal.addEventListener("mouseenter", () => {
    nameReveal.classList.add("hovered");
  });

  nameReveal.addEventListener("mouseleave", () => {
    nameReveal.classList.remove("hovered");
  });
}

// Back to Top Button
const backToTop = document.querySelector(".back-to-top");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

// Lightbox
const lightbox = document.querySelector(".lightbox");
const lightboxImg = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector(".lightbox-caption");
const closeBtn = lightbox.querySelector(".close");
const prevBtn = lightbox.querySelector(".prev");
const nextBtn = lightbox.querySelector(".next");
let currentIndex = 0;
let portfolioItems = [];

function openLightbox(index) {
  portfolioItems = document.querySelectorAll(".portfolio-item");
  currentIndex = index;
  const item = portfolioItems[index];
  lightboxImg.src = item.querySelector("img").src;
  lightboxCaption.textContent =
    item.querySelector(".item-overlay h3").textContent;
  lightbox.classList.add("active");
}

function updateLightbox() {
  const item = portfolioItems[currentIndex];
  lightboxImg.src = item.querySelector("img").src;
  lightboxCaption.textContent =
    item.querySelector(".item-overlay h3").textContent;
}

if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    currentIndex =
      (currentIndex - 1 + portfolioItems.length) % portfolioItems.length;
    updateLightbox();
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % portfolioItems.length;
    updateLightbox();
  });
}

// Portfolio Filter and Dynamic Loading
const portfolioGrid = document.querySelector(".portfolio-grid");
const filterButtons = document.querySelectorAll(".filter-btn");

async function loadProjects(filter = "all") {
  try {
    const response = await fetch("/api/projects");
    if (!response.ok) throw new Error("Failed to fetch projects");
    const projects = await response.json();

    portfolioGrid.innerHTML = "";
    const filteredProjects =
      filter === "all"
        ? projects
        : projects.filter((p) => p.category === filter);

    filteredProjects.forEach((project, index) => {
      const item = document.createElement("div");
      item.classList.add("portfolio-item");
      item.dataset.category = project.category;
      item.innerHTML = `
        <img src="${project.image}" alt="${project.title}" loading="lazy" />
        <div class="item-overlay">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
        </div>
      `;
      item.addEventListener("click", () => openLightbox(index));
      portfolioGrid.appendChild(item);
    });
  } catch (error) {
    console.error("Error loading projects:", error);
    portfolioGrid.innerHTML =
      "<p>Error loading projects. Please try again later.</p>";
  }
}

// Load all projects on page load
loadProjects();

// Filter buttons
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    loadProjects(filter);
  });
});

// Blog Dynamic Loading
const blogGrid = document.querySelector(".blog-grid");
async function loadBlogs() {
  try {
    const response = await fetch("/api/blogs");
    if (!response.ok) throw new Error("Failed to fetch blogs");
    const blogs = await response.json();

    blogGrid.innerHTML = "";
    blogs.forEach((blog) => {
      const card = document.createElement("article");
      card.classList.add("blog-card");
      card.innerHTML = `
        <h3>${blog.title}</h3>
        <p>${blog.excerpt}</p>
        <a href="/blog/${blog._id}">Read More</a>
      `;
      blogGrid.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading blogs:", error);
    blogGrid.innerHTML = "<p>Error loading blogs. Please try again later.</p>";
  }
}

// Load blogs on page load
if (blogGrid) {
  loadBlogs();
}

// Contact Form Submission
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const sendBtn = contactForm.querySelector(".send-btn");
    sendBtn.textContent = "Sending...";
    sendBtn.disabled = true;

    const formData = {
      name: contactForm.querySelector('input[type="text"]').value,
      email: contactForm.querySelector('input[type="email"]').value,
      message: contactForm.querySelector("textarea").value,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        sendBtn.textContent = "Message Sent!";
        sendBtn.style.background = "#28a745";
        setTimeout(() => {
          contactForm.reset();
          sendBtn.textContent = "Launch Message";
          sendBtn.style.background = "linear-gradient(45deg, #ff6f61, #d4a5ff)";
          sendBtn.disabled = false;
        }, 2000);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      sendBtn.textContent = "Error Sending";
      sendBtn.style.background = "#dc3545";
      setTimeout(() => {
        sendBtn.textContent = "Launch Message";
        sendBtn.style.background = "linear-gradient(45deg, #ff6f61, #d4a5ff)";
        sendBtn.disabled = false;
      }, 2000);
    }
  });
}

// Testimonial Form Submission
const testimonialForm = document.getElementById("testimonial-form");
if (testimonialForm) {
  testimonialForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const sendBtn = testimonialForm.querySelector(".send-btn");
    sendBtn.textContent = "Submitting...";
    sendBtn.disabled = true;

    const formData = {
      name: testimonialForm.querySelector('input[name="name"]').value,
      role: testimonialForm.querySelector('input[name="role"]').value,
      content: testimonialForm.querySelector('textarea[name="content"]').value,
    };

    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        sendBtn.textContent = "Submitted!";
        sendBtn.style.background = "#28a745";
        setTimeout(() => {
          testimonialForm.reset();
          sendBtn.textContent = "Submit Testimonial";
          sendBtn.style.background = "linear-gradient(45deg, #ff6f61, #d4a5ff)";
          sendBtn.disabled = false;
        }, 2000);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      sendBtn.textContent = "Error";
      sendBtn.style.background = "#dc3545";
      setTimeout(() => {
        sendBtn.textContent = "Submit Testimonial";
        sendBtn.style.background = "linear-gradient(45deg, #ff6f61, #d4a5ff)";
        sendBtn.disabled = false;
      }, 2000);
    }
  });
}

// Load Approved Testimonials
async function loadTestimonials() {
  try {
    const response = await fetch("/api/testimonials");
    if (!response.ok) throw new Error("Failed to fetch testimonials");
    const testimonials = await response.json();
    const carousel = document.querySelector(".testimonials-carousel");
    carousel.innerHTML = "";

    testimonials.forEach((testimonial) => {
      const item = document.createElement("div");
      item.classList.add("testimonial-item");
      item.innerHTML = `
        <p>"${testimonial.content}"</p>
        <h4>${testimonial.name}</h4>
        <span>${testimonial.role}</span>
      `;
      carousel.appendChild(item);
    });
  } catch (error) {
    console.error("Error loading testimonials:", error);
    document.querySelector(".testimonials-carousel").innerHTML =
      "<p>Error loading testimonials.</p>";
  }
}

// Load testimonials on page load
loadTestimonials();
