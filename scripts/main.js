// When the user scrolls the page, execute myFunction
window.onscroll = function() { stickTheNavbar() };

// Get the navbar
let navbar = document.getElementById("navbar");

// Get the offset position of the navbar
let sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickTheNavbar() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }
}

let mainNavLinks = document.querySelectorAll("nav ul div li a");
// let mainSections = document.querySelectorAll("main section");

let lastId;
let cur = [];

window.addEventListener("scroll", event => {
    let fromTop = window.scrollY;

    mainNavLinks.forEach(link => {
        let section = document.querySelector(link.hash);

        if (
            section.offsetTop <= fromTop &&
            section.offsetTop + section.offsetHeight > fromTop
        ) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
});

function burgerMenu() {
    document.getElementsByClassName('burger-menu')[0].addEventListener('click', () => {
        let nav = document.getElementsByTagName('nav')[0];
        nav.setAttribute('style', 'width: 100vw !important; height: 100vh !important; margin: 0 !important');

        let burgerIcon = nav.getElementsByClassName('burger-menu')[0];
        burgerIcon.setAttribute('style', 'display: none !important');

        let closeIcon = nav.getElementsByClassName('burger-close')[0];
        closeIcon.setAttribute('style', 'display: block !important');

        let ul = nav.getElementsByTagName('ul')[0];
        ul.setAttribute('style', 'display: flex !important; flex-direction: column !important;');
    })
}

function burgerClose() {
    document.getElementsByClassName('burger-close')[0].addEventListener('click', () => {
        let nav = document.getElementsByTagName('nav')[0];
        nav.setAttribute('style', '');

        let burgerIcon = nav.getElementsByClassName('burger-menu')[0];
        burgerIcon.setAttribute('style', 'display: block !important');

        let closeIcon = nav.getElementsByClassName('burger-close')[0];
        closeIcon.setAttribute('style', 'display: none !important');

        let ul = nav.getElementsByTagName('ul')[0];
        ul.setAttribute('style', '');
    })
}

function menuReset() {
    if (window.innerWidth > 768) {
        let nav = document.getElementsByTagName('nav')[0];
        nav.setAttribute('style', '');

        let burgerIcon = nav.getElementsByClassName('burger-menu')[0];
        burgerIcon.setAttribute('style', 'display: none !important');

        let closeIcon = nav.getElementsByClassName('burger-close')[0];
        closeIcon.setAttribute('style', 'display: none !important');

        let ul = nav.getElementsByTagName('ul')[0];
        ul.setAttribute('style', '');
    }

}

function menuInit() {
    if (window.innerWidth < 768) {
        let nav = document.getElementsByTagName('nav')[0];
        let closeIcon = nav.getElementsByClassName('burger-close')[0];

        if (closeIcon.style.display === 'none') {
            let burgerIcon = nav.getElementsByClassName('burger-menu')[0];
            burgerIcon.setAttribute('style', 'display: block !important');
        }


    }

}

burgerMenu();
burgerClose();

window.addEventListener('resize', () => {
    // console.log(window.innerWidth);
    menuInit();
    menuReset();
})

function deletePopup() {
    document.getElementsByClassName('delete-popup')[0].style.display = 'block';
    var sections = document.getElementsByTagName('section');

    var i;
    for (i = 0; i < sections.length; i++) {
        sections[i].style.opacity = '0.2';
    }

}

function deleteCancel() {
    document.getElementsByClassName('delete-popup')[0].style.display = 'none';
    var sections = document.getElementsByTagName('section');

    var i;
    for (i = 0; i < sections.length; i++) {
        sections[i].style.opacity = '1';
    }
}