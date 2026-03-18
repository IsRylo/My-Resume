/**
 * Function called whenever there is an update to the hash
 */

// app.js — add at the very top

const CONTACT_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxXkcAS23ia8tsOSmYUQG5qvBV_7gCvGWKNkw_eLOEjzbT709ME71L_3PzNMP-lGTD7Kw/exec';

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
  // 1. Grab input values
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  // 2. Validate required fields
  if (!name || !email || !message) {
    alert('Please fill in your name, email, and message.');
    return;
  }

  // 3. Show loading state
  document.getElementById('btn-text').classList.add('hidden');
  document.getElementById('btn-spinner').classList.remove('hidden');

  try {
    // 4. Send to Google Apps Script
    // Note: mode 'no-cors' means we won't get a response body back
    // but the script will still execute and send the email
    await fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message })
    });

    // 5. Since no-cors gives no response, assume success if no error thrown
    document.getElementById('contact-form').classList.add('hidden');
    document.getElementById('form-success').classList.remove('hidden');

  } catch(error) {
    // 6. Only hits here on network failure
    document.getElementById('form-error').classList.remove('hidden');

  } finally {
    // 7. Always reset button
    document.getElementById('btn-text').classList.remove('hidden');
    document.getElementById('btn-spinner').classList.add('hidden');
  }
}