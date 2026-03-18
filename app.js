/**
 * Function called whenever there is an update to the hash
 */

// app.js — add at the very top
const CONTACT_ENDPOINT = (typeof CONFIG !== 'undefined') 
      ? CONFIG.contactEndpoint
      : 'CONTACT_FORM';
     
let lastSubmitTime = 0;

function router() {
    // Initialize the hash, if null then #home
    const hash = window.location.hash || '#home';
    const app = document.getElementById('app');
    // Fade out current content
    app.style.opacity = '0';
    app.style.transform = 'translateY(8px)';
    app.style.transition = 'opacity 0.2s ease, transform 0.2s ease';

    // Swap content and fade back in
    setTimeout(() => {
       switch (hash) {
            case '#home':       renderHome(); break;
            case '#projects':   renderProjects(); break;
            case '#resume':     renderResume(); break;
            case '#contact':     renderContact(); break;
            default: renderHome();
        } 

        updateActiveNav(hash);

        // Fade in new content
        app.style.opacity = '1';
        app.style.transform = 'translateY(0)';
    }, 200);
}

// Listen for hash changes and run on first load
window.addEventListener('hashchange', router);
window.addEventListener('load', router);

/**
 * Renders the home section
 */
function renderHome() {
    document.getElementById('app').innerHTML = `
        <section class="hero">
            <div class="hero-photo">
                <img src="images/photo.jpg" alt="Your Name" />
            </div>
            <div class="hero-text">
                <h1>Hello</h1>
                <h2>A Bit About Me</h2>
                <p>Your description here.</p>
                <div class="hero-buttons">
                <a href="#resume"   class="btn btn-yellow">Resume</a>
                <a href="#projects" class="btn btn-red">Projects</a>
                <a href="#contact"  class="btn btn-teal">Contact</a>
                </div>
            </div>
        </section>
    `;

}

/**
 * Renders the Projects Section
 */
function renderProjects() {
    // Starting with section wrapper + filter buttons
    const tags = ['All', ...new Set(projects.flatMap(p => p.tags))];

    const filterButtons = tags.map(tag =>  `
        <button class="filter-btn ${tag === 'All' ? 'active' : ''}"
                onclick="filterProjects('${tag}')">
                ${tag}
        </button>
    `).join('');

    // Buil all project cards
    const cards = projects.map(p => projectCard(p)).join('');
    
    document.getElementById('app').innerHTML = `
        <section class="section">
        <h2 class="section-title">Projects</h2>
        <div class="filter-bar">${filterButtons}</div>
        <div class="projects-grid" id="projects-grid">${cards}</div>
        </section>
    `;
}

/**
 * Helper Function to build individual project cards
 */
function projectCard(p) {
    return `
        <div class="project-card" data-tags="${p.tags.join(',')}">
            <div class="project-image">
                <img src="${p.image}" alt="${p.title}" />
            </div>
            <div class="project-info">
                <h3>${p.title}</h3>
                <p>${p.description}</p>
                <div class="project-tags">
                ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                </div>
                <div class="project-links">
                <a href="${p.url}" target="_blank" class="link-btn">View Project</a>
                <a href="${p.github}" target="_blank" class="link-btn link-btn-outline">GitHub</a>
                </div>
            </div>
        </div>
    `;
}


/**
 * Function to filter project based on tags
 */
function filterProjects(tag) {
  // Update active button
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.trim() === tag);
  });

  // Show/hide cards based on tag
  document.querySelectorAll('.project-card').forEach(card => {
    const cardTags = card.dataset.tags.split(',');
    const match = tag === 'All' || cardTags.includes(tag);
    card.style.display = match ? 'block' : 'none';
  });
}

/**
 * Function to update the navbar
 */
function updateActiveNav(hash) {
    // Remove active class from all links
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.remove('active');
    });
    // Add it to the matching one
    const active = document.querySelector(`.nav-links a[href="${hash}"]`);
    if (active) active.classList.add('active');
}



/**
 * Function to render the contact me section
 */
// app.js

function renderContact() {
  document.getElementById('app').innerHTML = `
    <section class="section">
      <h2 class="section-title">Contact</h2>
      <p class="contact-intro">Have a question or want to work together? Send me a message!</p>

      <div class="contact-wrapper">

        <!-- Contact Form -->
        <div class="contact-form-container">
          <div id="form-success" class="form-success hidden">
            <span class="success-icon">✓</span>
            <p>Message sent! I'll get back to you soon.</p>
          </div>

          <div id="form-error" class="form-error hidden">
            <p>Something went wrong. Please try again.</p>
          </div>

          <div id="contact-form">
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" id="name" placeholder="Your name" required />
            </div>

            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" placeholder="your@email.com" required />
            </div>

            <div class="form-group">
              <label for="subject">Subject</label>
              <input type="text" id="subject" placeholder="What's this about?" />
            </div>

            <div class="form-group">
              <label for="message">Message</label>
              <textarea id="message" rows="5" placeholder="Your message here..." required></textarea>
            </div>

            <button class="submit-btn" onclick="submitForm()">
              <span id="btn-text">Send Message</span>
              <span id="btn-spinner" class="hidden">Sending...</span>
            </button>
          </div>
        </div>

        <!-- Contact Links -->
        <div class="contact-links">
          <a href="mailto:your@email.com" class="contact-item">
            <span class="contact-icon">✉</span>
            your@email.com
          </a>
          <a href="https://linkedin.com/in/yourprofile" target="_blank" class="contact-item">
            <span class="contact-icon">in</span>
            LinkedIn
          </a>
          <a href="https://github.com/IsRylo" target="_blank" class="contact-item">
            <span class="contact-icon">⌥</span>
            GitHub
          </a>
        </div>

      </div>
    </section>
  `;
}

 /**
  * Function to handle contact me form  submission
  */
 // app.js — replace your existing submitForm() with this

async function submitForm() {
  // 1. Get raw values
  const rawName    = document.getElementById('name').value;
  const rawEmail   = document.getElementById('email').value;
  const rawSubject = document.getElementById('subject').value;
  const rawMessage = document.getElementById('message').value;

  // 2. Sanitize all inputs
  const name    = sanitize(rawName);
  const email   = sanitize(rawEmail);
  const subject = sanitize(rawSubject);
  const message = sanitize(rawMessage);

  // 3. Validate required fields
  if (!name || !email || !message) {
    showFormMessage('error', '⚠️ Please fill in your name, email, and message.');
    return;
  }

  // 4. Validate email format
  if (!isValidEmail(email)) {
    showFormMessage('error', '⚠️ Please enter a valid email address.');
    return;
  }

  // 5. Check for dangerous content in all fields
  if (!isSafeInput(name) || !isSafeInput(message) || !isSafeInput(subject)) {
    showFormMessage('error', '⚠️ Your message contains invalid characters. Please remove any HTML or script tags.');
    return;
  }

  // 6. Length limits — prevents someone sending a huge payload
  if (name.length > 100) {
    showFormMessage('error', '⚠️ Name must be under 100 characters.');
    return;
  }
  if (subject.length > 200) {
    showFormMessage('error', '⚠️ Subject must be under 200 characters.');
    return;
  }
  if (message.length > 5000) {
    showFormMessage('error', `⚠️ Message is too long (${message.length}/5000 characters).`);
    return;
  }

  // 7. Rate limiting — prevents someone spamming the button
  if (isRateLimited()) {
    showFormMessage('error', '⚠️ Please wait a moment before sending another message.');
    return;
  }

  setButtonLoading(true);
  showFormMessage('info', '⏳ Sending your message... this may take up to a minute.');

  // Set a timeout warning at 30 seconds
  const slowWarning = setTimeout(() => {
    showFormMessage('info', '🕐 Still sending... processing your request, please wait.');
  }, 30000);

  try {
    await fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message })
    });

    clearTimeout(slowWarning);

    // Hide the form and show success
    document.getElementById('contact-form').classList.add('hidden');
    showFormMessage('success', '✓ Message sent! I\'ll get back to you soon.');

  } catch(error) {
    clearTimeout(slowWarning);
    showFormMessage('error', '✗ Something went wrong. Please try again or email me directly.');

  } finally {
    setButtonLoading(false);
  }
}

/**
 * Helper - shows a message above the form
 */

function showFormMessage(type, text) {
  // Remove any existing message first
  const existing = document.getElementById('form-message');
  if (existing) existing.remove();

  const div = document.createElement('div');
  div.id = 'form-message';
  div.className = `form-message form-message--${type}`;
  div.textContent = text;

  const form = document.getElementById('contact-form');
  form.parentNode.insertBefore(div, form);

  // Auto-remove info messages after 90 seconds
  if (type === 'info') {
    setTimeout(() => div.remove(), 90000);
  }
}

/**
 * Helper function to toggle button loading state
 */

function setButtonLoading(isLoading) {
  document.getElementById('btn-text').classList.toggle('hidden', isLoading);
  document.getElementById('btn-spinner').classList.toggle('hidden', !isLoading);
}


/**
 * 
 * @param {string} str - Raw string input from forms.
 * @returns {string} Safe string passed into my mail processing server.
 */

function sanitize(str) {
  return str
    .replace(/</g, '&lt;')    // replace < so no HTML tags work
    .replace(/>/g, '&gt;')    // replace > so no HTML tags work
    .replace(/&/g, '&amp;')   // replace & to prevent HTML entities
    .trim();
}

/**
 * Helper function
 * @param {string} email - Email text from forms
 * @returns {bool} Is the email a valid email format or not.
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Helper function 
 * @param {string} str - Raw text input from forms
 * @returns {bool} If the str contains unsafe patterns
 */
function isSafeInput(str) {
  // Blocks common script injection patterns
  const dangerousPatterns = /(<script|javascript:|on\w+=|<iframe|<img|<svg)/gi;
  return !dangerousPatterns.test(str);
}

/**
 * Helper function to prevent form being submitted mroe than once per 60 seconds
 */
function isRateLimited() {
  const now = Date.now();
  const cooldown = 60 * 1000;
  if (now - lastSubmitTime < cooldown) return true;
  lastSubmitTime = now;
  return false;
}