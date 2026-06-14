const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');
const yearElement = document.getElementById('year');
const contactForm = document.getElementById('contactForm');
const thankYouMessage = document.getElementById('thankYouMessage');

if (yearElement) {
    yearElement.innerHTML = `&copy; ${new Date().getFullYear()} Butho James Mthethwa. All rights reserved.`;
}

if (navToggle) {
    navToggle.addEventListener('click', () => {
        document.body.classList.toggle('nav-open');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
    });
});

if (contactForm && thankYouMessage) {
    contactForm.addEventListener('submit', event => {
        event.preventDefault();

        fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: {
                Accept: 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                thankYouMessage.style.display = 'block';
                contactForm.reset();
            } else {
                alert('There was an issue with your submission. Please try again.');
            }
        }).catch(() => {
            alert('There was an error. Please try again.');
        });
    });
}
