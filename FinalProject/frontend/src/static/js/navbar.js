// Create nav tag
let nav = document.createElement('nav');
nav.classList.add("navbar", "navbar-dark");

// add first button with span icon
let toggleButton = document.createElement('div');
toggleButton.classList.add("navbar-toggler");
toggleButton.setAttribute("data-bs-toggle", "collapse");
toggleButton.setAttribute("data-bs-target", "#navbarToggleExternalContent");
toggleButton.setAttribute("aria-controls", "navbarToggleExternalContent");
toggleButton.setAttribute("aria-label", "Toggle navigation");
nav.appendChild(toggleButton);
for (let i = 0; i < 3; i++) {
    let divBar = document.createElement('div');
    toggleButton.appendChild(divBar);
}

// add first anchor with image
let navAnchor = document.createElement("a");
navAnchor.classList.add("navbar-brand");
navAnchor.href = "/";
let navAnchorImg = document.createElement("img");
navAnchorImg.src = "/images/logo-cropped.jpeg";
navAnchorImg.alt = "logo";
navAnchor.appendChild(navAnchorImg);
nav.appendChild(navAnchor);


// create dropdown menu div
let dropdownDiv = document.createElement('div');
dropdownDiv.classList.add("collapse");
dropdownDiv.id = "navbarToggleExternalContent";



export function buildLink(id, href, innerHtmlText) {
    let container = document.createElement("div");
    container.classList.add("text-center");
    container.id = id;
    let anchor = document.createElement("a");
    anchor.href = href;
    let header = document.createElement('h5');
    header.classList.add("text-white", "h4");
    header.innerHTML = innerHtmlText

    anchor.appendChild(header);
    container.appendChild(anchor);
    dropdownDiv.appendChild(container);
    
    return {
        container: container,
        anchor: anchor,
        dropdownDiv: dropdownDiv
    };
}

let body = document.querySelector("body");
body.prepend(dropdownDiv);
body.prepend(nav);



console.log(body.childNodes);