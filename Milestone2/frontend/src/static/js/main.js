

let dropdown = document.querySelector("#dropdown");
let hamburgerMenu = document.querySelector("#hamburger-btn");


hamburgerMenu.addEventListener("click", function(e) {
    console.log("hb click");
    dropdown.classList.toggle('dropdown-closed');
    dropdown.classList.toggle('dropdown-opened');
});