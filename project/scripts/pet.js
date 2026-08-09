(function() {
    'use strict';

    const navLinks = document.querySelectorAll('.nav-links a');
    const pages = {
        home: document.getElementById('page-home'),
        care: document.getElementById('page-care'),
        about: document.getElementById('page-about'),
        contact: document.getElementById('page-contact')
    };

    function hrefToPageId(href) {
        if (!href) return null;
        if (href.startsWith('#page-')) return href.replace('#page-', '');
        const m = href.match(/([^\/?#]+?)(?:\.html)?(?:[?#].*)?$/);
        if (!m) return null;
        const name = m[1].toLowerCase();
        if (name.includes('home')) return 'home';
        if (name.includes('care')) return 'care';
        if (name.includes('about')) return 'about';
        if (name.includes('contact')) return 'contact';
        return null;
    }

    navLinks.forEach(link => {
        if (!link.dataset.page) {
            const pageId = hrefToPageId(link.getAttribute('href'));
            if (pageId) link.dataset.page = pageId;
        }
    });

    document.querySelectorAll('[data-nav-link]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href.startsWith('#page-')) {
                const targetId = href.replace('#page-', '');
                navigateTo(targetId);
            }
        });
    });

    function navigateTo(pageId) {
        Object.values(pages).forEach(p => {
            if (p) p.classList.remove('active-page');
        });
        if (pages[pageId]) {
            pages[pageId].classList.add('active-page');
        }
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === pageId) {
                link.classList.add('active');
            }
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.dataset.page || hrefToPageId(this.getAttribute('href'));
            if (pageId && pages[pageId]) {
                navigateTo(pageId);
            } else {

                const href = this.getAttribute('href');
                if (href && href.endsWith('.html')) {
                    window.location.href = href;
                }
            }
        });
    });


    const breeds = [
        { name: 'Labrador', traits: 'Friendly, energetic, great with kids', img: 'images/puppy6.jpg' },
        { name: 'Golden Retriever', traits: 'Intelligent, loyal, gentle', img: 'images/puppy5.jpg' },
        { name: 'French Bulldog', traits: 'Playful, adaptable, low-energy', img: 'images/puppy4.jpg' },
        { name: 'Beagle', traits: 'Curious, merry, great scent hound', img: 'images/puppy3.jpg' },
        { name: 'Poodle', traits: 'Smart, hypoallergenic, elegant', img: 'images/puppy2.jpg' },
        { name: 'German Shepherd', traits: 'Brave, confident, protective', img: 'images/puppy1.jpg' }
    ];

    const breedGrid = document.getElementById('breedGrid');
    const favoriteCountEl = document.getElementById('favoriteCount');
    let favorites = 0;

    function loadFavorites() {
        try {
            const saved = localStorage.getItem('paws_favorites');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    return parsed;
                }
            }
        } catch (e) {}
        return [];
    }

    let favoriteNames = loadFavorites();

    function saveFavorites() {
        try {
            localStorage.setItem('paws_favorites', JSON.stringify(favoriteNames));
        } catch (e) {}
    }

    function updateFavoriteCount() {
        favorites = favoriteNames.length;
        if (favoriteCountEl) {
            favoriteCountEl.textContent = '❤️ Favorites: ' + favorites;
        }
    }

    function renderBreeds() {
        if (!breedGrid) return;

        breedGrid.innerHTML = '';
        breeds.forEach(breed => {
            const card = document.createElement('div');
            card.className = 'breed-card';

            const isFav = favoriteNames.includes(breed.name);

            const img = document.createElement('img');
            img.src = breed.img;
            img.alt = breed.name;
            img.loading = 'lazy';
            img.onerror = function() {
                this.onerror = null;
                this.src = 'images/placeholder.jpg';
            };

            const name = document.createElement('h3');
            name.textContent = breed.name;

            const traits = document.createElement('div');
            traits.className = 'traits';
            traits.textContent = breed.traits;

            const likeBtn = document.createElement('button');
            likeBtn.className = 'like-btn' + (isFav ? ' liked' : '');
            likeBtn.textContent = isFav ? '❤️' : '🤍';
            likeBtn.dataset.breed = breed.name;
            likeBtn.setAttribute('aria-label', 'Favorite ' + breed.name);

            likeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const bname = this.dataset.breed;
                const idx = favoriteNames.indexOf(bname);
                if (idx > -1) {
                    favoriteNames.splice(idx, 1);
                    this.textContent = '🤍';
                    this.classList.remove('liked');
                } else {
                    favoriteNames.push(bname);
                    this.textContent = '❤️';
                    this.classList.add('liked');
                }
                saveFavorites();
                updateFavoriteCount();
            });

            card.append(img, name, traits, likeBtn);
            breedGrid.appendChild(card);
        });
        updateFavoriteCount();
    }

    if (breedGrid) {
        renderBreeds();
    }

    const reminderBtns = document.querySelectorAll('.reminder-btn');

    function sendReminder(topic) {
        const message = '🐕 Time to walk your dog! Don\'t forget to review: ' + topic;

        if (!('Notification' in window)) {
            alert('🔔 ' + message);
            return;
        }

        if (Notification.permission === 'granted') {
            new Notification('Paws & Play Reminder', {
                body: message,
                icon: '🐾'
            });
        } else if (Notification.permission === 'denied') {
            alert('🔔 ' + message + ' (Please enable notifications in your browser settings.)');
        } else {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    new Notification('Paws & Play Reminder', {
                        body: message,
                        icon: '🐾'
                    });
                } else {
                    alert('🔔 ' + message);
                }
            });
        }
    }

    reminderBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const topic = this.dataset.reminder || 'your dog care';
            sendReminder(topic);
        });
    });

    const form = document.getElementById('contactForm');
    if (form) {
        const nameInput = document.getElementById('formName');
        const emailInput = document.getElementById('formEmail');
        const messageInput = document.getElementById('formMessage');
        const nameGroup = document.getElementById('nameGroup');
        const emailGroup = document.getElementById('emailGroup');
        const messageGroup = document.getElementById('messageGroup');
        const successMsg = document.getElementById('formSuccess');

        function validateField(input, group, errorCondition) {
            if (errorCondition) {
                group.classList.add('invalid');
                return false;
            } else {
                group.classList.remove('invalid');
                return true;
            }
        }

        function validateName() {
            return validateField(nameInput, nameGroup, nameInput.value.trim() === '');
        }

        function validateEmail() {
            const email = emailInput.value.trim();
            const isValid = email !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            return validateField(emailInput, emailGroup, !isValid);
        }

        function validateMessage() {
            return validateField(messageInput, messageGroup, messageInput.value.trim() === '');
        }

        nameInput.addEventListener('blur', validateName);
        nameInput.addEventListener('input', validateName);
        emailInput.addEventListener('blur', validateEmail);
        emailInput.addEventListener('input', validateEmail);
        messageInput.addEventListener('blur', validateMessage);
        messageInput.addEventListener('input', validateMessage);

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isMessageValid = validateMessage();

            if (isNameValid && isEmailValid && isMessageValid) {
                successMsg.classList.add('show');
                form.reset();
                [nameGroup, emailGroup, messageGroup].forEach(g => g.classList.remove('invalid'));
                setTimeout(() => {
                    successMsg.classList.remove('show');
                }, 4000);
            } else {
                if (!isNameValid) nameInput.focus();
                else if (!isEmailValid) emailInput.focus();
                else if (!isMessageValid) messageInput.focus();
            }
        });
    }

    console.log('🐾 Ralph Pet Store fully loaded with local images and safe DOM checks!');
})();