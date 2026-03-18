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
    timelineIndex = 0;
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
          <button class="contact-item" onclick="copyEmail()">
            <span class="contact-icon">✉</span>
            <span id="email-label">your@email.com</span>
          </button>
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

  div.scrollIntoView({ behavior: 'smooth', block: 'center' });

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

/**
 * Function triggered on Click for copying email to user's clipboard
 */
function copyEmail() {
  const email = 'loysingryono@gmail.com'

  navigator.clipboard.writeText(email)
    .then(() => {
      // Temporarily change the label to confirm copy
      const label = document.getElementById('email-label');
      const original = label.textContent;

      label.textContent = 'Email Copied!';
      
      // Wait 2 seconds before restorign tehe original
      setTimeout(() => {
        label.textContent = original;
      }, 2000);
    })
    .catch(() => {
      alert('Could not copy automatically. Please copy manually: ' + email);
    });
}

/**
 * Renders resume section of the program. 
 */
function renderResume() {
  document.getElementById('app').innerHTML = `
    <section class="resume-dashboard">

      <!-- LEFT PANEL — 2/3 width -->
      <div class="resume-left">
      <div class="resume-left-header">
          <h2 class="section-title">Resume</h2>
          <a href="files/cv.pdf" download class="btn btn-yellow">
            ↓ Download CV
          </a>
        </div>

        <!-- Horizontal scrollable timeline -->
        <div class="resume-block">
          <h3 class="resume-block-title">Experience</h3>
          <div class="timeline-container">
            <button class="timeline-nav timeline-nav--prev" onclick="slideTimeline(-1)">‹</button>
            <div class="timeline" id="timeline">
              <div class="timeline-track"></div>
              ${resume.experience.map((item, index) => `
                <div class="timeline-item" style="animation-delay: ${index * 0.1}s">
                  <div class="timeline-dot"></div>
                  <div class="timeline-period">${item.period}</div>
                  <div class="timeline-card">
                    <h4>${item.role}</h4>
                    <span class="timeline-company">${item.company}</span>
                    <p>${item.description}</p>
                  </div>
                </div>
              `).join('')}
            </div>
            <button class="timeline-nav timeline-nav--next" onclick="slideTimeline(1)">›</button>
          </div>
        </div>

        <!-- Skills — moved from right to left panel -->
        <div class="resume-block">
          <h3 class="resume-block-title">Skills</h3>
          <div class="stats-grid">
            ${resume.skills.map((skill, index) => `
              <div class="stat-item" style="animation-delay: ${index * 0.08}s">
                <div class="stat-header">
                  <span class="stat-name">${skill.name}</span>
                </div>
                <div class="stat-bar">
                  <div class="stat-fill" data-level="${skill.level}"></div>
                </div>
                <span class="stat-category">${skill.category}</span>
              </div>
            `).join('')}
          </div>
        </div>

      </div>

      <!-- RIGHT PANEL — 1/3 width, passport only -->
      <div class="resume-right">
        <div class="resume-block">
          <h3 class="resume-block-title">Education</h3>
          <div class="passport-page">
            ${resume.education.map((item, index) => `
              <div class="stamp ${item.unlocked ? 'stamp--inked' : 'stamp--faded'}"
                  style="--rotate: ${index % 2 === 0 ? '-2deg' : '1.5deg'};
                          animation-delay: ${index * 0.2}s">
                <div class="stamp-border">
                  <div class="stamp-inner">

                    <!-- Replace stamp-icon div with this -->
                    <div class="stamp-logo">
                      <img src="${item.logo}" alt="${item.institution} logo" />
                    </div>

                    <div class="stamp-country">${item.institution}</div>
                    <div class="stamp-divider">✦ ✦ ✦</div>
                    <div class="stamp-visa">${item.degree}</div>
                    <div class="stamp-date">${item.period}</div>
                    <div class="stamp-status">
                      ${item.unlocked ? 'ADMITTED' : 'IN PROGRESS'}
                    </div>
                  </div>
                </div>
                <div class="stamp-description">${item.description}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

    </section>
  `;

  animateStatBars();
  initTimeline();
}

// Tracks current timeline scroll position
let timelineIndex = 0;

function initTimeline() {
  const timeline = document.getElementById('timeline');
  if (!timeline) return;

  // Enable touch/mouse swipe support
  let startX = 0;
  let isDragging = false;

  // Touch events — mobile swipe
  timeline.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  timeline.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      slideTimeline(diff > 0 ? 1 : -1);
    }
  });

  // Mouse drag events — desktop swipe
  timeline.addEventListener('mousedown', e => {
    startX = e.clientX;
    isDragging = true;
    timeline.style.cursor = 'grabbing';
  });

  timeline.addEventListener('mouseup', e => {
    if (!isDragging) return;
    isDragging = false;
    timeline.style.cursor = 'grab';
    const diff = startX - e.clientX;
    if (Math.abs(diff) > 50) {
      slideTimeline(diff > 0 ? 1 : -1);
    }
  });

  // Cancel drag if mouse leaves timeline
  timeline.addEventListener('mouseleave', () => {
    isDragging = false;
    timeline.style.cursor = 'grab';
  });

  updateNavButtons();
}

function slideTimeline(direction) {
  const timeline = document.getElementById('timeline');
  if (!timeline) return;

  const itemWidth = 280 + 24; // card width + gap
  const maxIndex = resume.experience.length - 1;

  // Clamp index between 0 and max
  timelineIndex = Math.max(0, Math.min(timelineIndex + direction, maxIndex));

  // Scroll to the new position smoothly
  timeline.scrollTo({
    left: timelineIndex * itemWidth,
    behavior: 'smooth'
  });

  updateNavButtons();
}

function updateNavButtons() {
  const prev = document.querySelector('.timeline-nav--prev');
  const next = document.querySelector('.timeline-nav--next');
  if (!prev || !next) return;

  const maxIndex = resume.experience.length - 1;

  // Dim the button when at the start or end
  prev.style.opacity = timelineIndex === 0 ? '0.3' : '1';
  prev.style.pointerEvents = timelineIndex === 0 ? 'none' : 'auto';
  next.style.opacity = timelineIndex === maxIndex ? '0.3' : '1';
  next.style.pointerEvents = timelineIndex === maxIndex ? 'none' : 'auto';
}

// Triggers the stat bar fill animation
function animateStatBars() {
  // Small delay so the CSS transition is visible
  setTimeout(() => {
    document.querySelectorAll('.stat-fill').forEach(bar => {
      bar.style.width = bar.dataset.level + '%';
    });
  }, 200);
}

// Helper — renders one experience or education item
function resumeItem(item) {
  return `
    <div class="resume-item">
      <div class="resume-meta">
        <span class="resume-date">${item.period}</span>
        <span class="resume-company">
          ${item.company || item.institution}
        </span>
      </div>
      <div class="resume-details">
        <h4>${item.role || item.degree}</h4>
        <p>${item.description}</p>
      </div>
    </div>
  `;
}