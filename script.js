// Theme Toggle Functionality
const themeToggle = document.getElementById("theme-toggle")
const themeIcon = themeToggle.querySelector(".theme-icon")
const body = document.body

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem("theme") || "light"
body.setAttribute("data-theme", currentTheme)
updateThemeIcon(currentTheme)

themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  body.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)
  updateThemeIcon(newTheme)
})

function updateThemeIcon(theme) {
  themeIcon.textContent = theme === "dark" ? "☀️" : "🌙"
}

// Mobile Navigation Toggle
const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
  })
})

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Navbar Background on Scroll
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar")
  if (window.scrollY > 50) {
    navbar.style.background =
      body.getAttribute("data-theme") === "dark" ? "rgba(10, 10, 10, 0.98)" : "rgba(255, 255, 255, 0.98)"
  } else {
    navbar.style.background =
      body.getAttribute("data-theme") === "dark" ? "rgba(10, 10, 10, 0.95)" : "rgba(255, 255, 255, 0.95)"
  }
})

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Add staggered delay for multiple elements in the same section
      const delay = index * 200
      setTimeout(() => {
        entry.target.classList.add("animate")
      }, delay)
    }
  })
}, observerOptions)

// Observe all animation elements
document.addEventListener("DOMContentLoaded", () => {
  const animationElements = document.querySelectorAll(".slide-in-left, .slide-in-right, .slide-up")
  animationElements.forEach((el) => {
    animationObserver.observe(el)
  })
})

// Contact Form Handling
const contactForm = document.getElementById("contact-form")
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(contactForm)
  const name = formData.get("name")
  const email = formData.get("email")
  const subject = formData.get("subject")
  const message = formData.get("message")

  // Simple form validation
  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields.")
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.")
    return
  }

  // Simulate form submission
  const submitButton = contactForm.querySelector('button[type="submit"]')
  const originalText = submitButton.textContent
  submitButton.textContent = "Sending..."
  submitButton.disabled = true

  setTimeout(() => {
    alert("Thank you for your message! I'll get back to you soon.")
    contactForm.reset()
    submitButton.textContent = originalText
    submitButton.disabled = false
  }, 2000)
})

// Active Navigation Link Highlighting
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Add active class styles
const style = document.createElement("style")
style.textContent = `
    .nav-link.active {
        color: var(--accent-primary);
    }
    .nav-link.active::after {
        width: 100%;
    }
`
document.head.appendChild(style)

function initializeScrollAnimations() {
  // About section - slide from left
  const aboutElements = document.querySelectorAll("#about .slide-in-left")
  aboutElements.forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.2}s`
  })

  // Education section - alternating animations
  const educationCards = document.querySelectorAll(".education-card")
  educationCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.3}s`
  })

  // Skills section - alternating animations
  const skillCategories = document.querySelectorAll(".skill-category")
  skillCategories.forEach((category, index) => {
    category.style.transitionDelay = `${index * 0.2}s`
  })

  // Projects section - alternating animations
  const projectCards = document.querySelectorAll(".project-card")
  projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.2}s`
  })

  // Contact section - slide up animations
  const contactElements = document.querySelectorAll("#contact .slide-up")
  contactElements.forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.3}s`
  })
}

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeScrollAnimations)

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }
  type()
}

// Initialize typing effect when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title")
  const originalText = heroTitle.textContent
  typeWriter(heroTitle, originalText, 80)
})
