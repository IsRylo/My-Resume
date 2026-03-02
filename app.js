// Function called whenever the URL has changes
function router() {
    console.log("router called");
    // Initialize the hash, if null then #home
    const hash = window.location.hash || '#home';
    switch (hash) {
        case '#home':       renderHome(); break;
        case '#projects':   renderProjects(); break;
        case '#resume':     renderResume(); break;
        case 'contact':     renderContact(); break;
        default: renderHome();
    }

    updateActiveNav(hash);
}

// Listen for hash changes and run on first load
window.addEventListener('hashchange', router);
window.addEventListener('load', router);


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