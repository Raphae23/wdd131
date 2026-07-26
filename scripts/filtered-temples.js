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

const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    // --- THREE ADDED TEMPLES ---
    {
        templeName: "Salt Lake Utah",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253015,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/400x250/salt-lake-temple-37762.jpg"
    },
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 41010,
        imageUrl: "https://www.churchofjesuschrist.org/imgs/17e2c70d687fffedfe115197e57fa8f5d1d369bb/full/640%2C/0/default.jpg"
    },
    {
        templeName: "Nairobi Kenya",
        location: "Nairobi, Kenya",
        dedicated: "2021, December, 12",
        area: 18500,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/nairobi-kenya-temple/nairobi-kenya-temple-60488-main.jpg"
    }
];


function renderTemples(templeList) {
    const grid = document.getElementById('temple-grid');
    grid.innerHTML = ''; // clear

    templeList.forEach(temple => {
        const year = parseInt(temple.dedicated.split(',')[0], 10);

        const card = document.createElement('div');
        card.className = 'temple-card';

        card.innerHTML = `
            <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy" />
            <div class="card-content">
                <h3>${temple.templeName}</h3>
                <div class="location">${temple.location}</div>
                <div class="details">
                    <span>Dedicated:</span> ${temple.dedicated}<br>
                    <span>Area:</span> ${temple.area.toLocaleString()} ft²
                </div>
            </div>
        `;

        grid.appendChild(card);
    });
}



function filterTemples(filter) {
    let filtered = [];
    const now = new Date().getFullYear();

    switch (filter) {
        case 'home':
            filtered = temples;
            break;
        case 'old':
            filtered = temples.filter(t => parseInt(t.dedicated.split(',')[0], 10) < 1900);
            break;
        case 'new':
            filtered = temples.filter(t => parseInt(t.dedicated.split(',')[0], 10) > 2000);
            break;
        case 'large':
            filtered = temples.filter(t => t.area > 90000);
            break;
        case 'small':
            filtered = temples.filter(t => t.area < 10000);
            break;
        default:
            filtered = temples;
    }

    renderTemples(filtered);

    document.querySelectorAll('nav a').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });
}



document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const filter = link.dataset.filter;
        filterTemples(filter);
    });
});


filterTemples('home');

