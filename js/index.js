const hamburgerContainer = document.querySelector('.hamburger-container');
const nav = document.querySelector('nav')
const navLinks = document.querySelector('.nav-links');
const images = document.querySelectorAll('.not-loaded');  // lazy load

hamburgerContainer.addEventListener('click', () => {
    nav.classList.toggle('mobile');
    const expanded = hamburgerContainer.getAttribute('aria-expanded') === 'true'
    hamburgerContainer.setAttribute('aria-expanded', !expanded)
});

// dark mode toggle and system preferences
const toggleThemeBtn = document.querySelector('#dark-toggle');
toggleThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.getElementsByTagName('body')[0].classList.toggle('dark');
    toggleThemeBtn.checked = true;
} else {
    toggleThemeBtn.checked = false;
}

// progressive bar
window.addEventListener('scroll', handleScroll);

function handleScroll() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("progressBar").style.width = scrolled + "%";
}

//  lazy loading
const options = {
    treshold: 0.5,
}

const handleLoading = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const image = entry.target;
            image.src = image.dataset.lazy; // il valore di src si scambia lazy
            image.onload = () => {
                image.classList.remove('not-loaded')
                image.classList.add('loaded');
            }
            observer.unobserve(image);
        }
    });
}

const observer = new IntersectionObserver(handleLoading, options);
// observing a group of images
images.forEach((image) => {     
    observer.observe(image);
});