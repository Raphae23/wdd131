// Dynamically populate the current year in the footer
document.addEventListener('DOMContentLoaded', function() {
    // Get the current year and populate the copyright span
    const currentYear = new Date().getFullYear();
    const currentYearSpan = document.getElementById('currentyear');
    if (currentYearSpan) {
        currentYearSpan.textContent = currentYear;
    }

    // Populate the last modified date
    const lastModifiedParagraph = document.getElementById('lastModified');
    if (lastModifiedParagraph) {
        lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`;
    }
});