/**
 * Function called whenever there is an update to the hash
 */
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