// When the user scrolls the page, execute myFunction
window.onscroll = function() { myFunction() };

// Get the navbar
let navbar = document.getElementById("navbar");

// Get the offset position of the navbar
let sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
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