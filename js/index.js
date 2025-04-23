const hamburgerContainer = document.querySelector('.hamburger-container');
const hamburgerMenu = document.querySelector('.menu')
const hamburgerBars = document.querySelectorAll('.bar');
const navLinks = document.querySelector('.nav-links');
let isMenuOpen = false;
// lazy load
const images = document.querySelectorAll('.not-loaded');

hamburgerContainer.addEventListener('click', () => {
    if (!isMenuOpen) {
        hamburgerMenu.classList.remove('hidden');
        hamburgerMenu.classList.add('visible');
        hamburgerBars.forEach((bar) => bar.classList.add('clicked')) ;
        hamburgerMenu.innerHTML = `
        <ul class=hamMenu-links> 
            <li><a href=#storia>Il concetto</a></li>
            <li><a href=#bioedilizia>Bioedilizia</a></li>
            <li><a href=#tecniche>Tecniche</a></li>
            <li><a href=#materiali>Materiali</a></li>
        </ul>`
        isMenuOpen = true;
    } else if (isMenuOpen == true) {
        hamburgerMenu.classList.remove('visible');
        hamburgerMenu.classList.add('hidden');
        hamburgerBars.forEach((bar) => bar.classList.remove('clicked')) ;
        hamburgerMenu.innerHTML = ``
        isMenuOpen = false;
    }
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
images.forEach((image) => {       // observing in a group of images
    observer.observe(image);
});



