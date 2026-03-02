// Function called whenever the URL has changes
function router() {
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

}