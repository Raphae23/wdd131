const yearSpan = document.getElementById('copyright-year');
const modifiedP = document.getElementById('last-modified');

if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

if (modifiedP) {
    modifiedP.textContent = `Last modified: ${document.lastModified}`;
}

const hamburgerBtn = document.getElementById('hamburger-btn');
const mainNav = document.getElementById('main-nav');

if (hamburgerBtn && mainNav) {
    hamburgerBtn.addEventListener('click', function() {
        mainNav.classList.toggle('open');
        this.classList.toggle('open');
    });
}