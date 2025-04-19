const hamburgerContainer = document.querySelector('.ham-menu');
const hamburgerMenu = document.querySelector('.menu')
const hamburgerIcon = document.querySelector('.ham-menu > svg');
const navLinks = document.querySelector('.nav-links');
let isMenuOpen = false;

// lazy load
const images = document.querySelectorAll('.not-loaded');

hamburgerContainer.addEventListener('click', () => {
    if (!isMenuOpen) {
        hamburgerMenu.classList.remove('hidden');
        hamburgerMenu.classList.add('visible');
        hamburgerIcon.style.display = 'none'
        hamburgerContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" /></svg></svg>`;
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
        hamburgerContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /> </svg>`
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



