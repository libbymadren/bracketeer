import { currentUser } from "/js/common.js";

function generateImageUrl(arrayBuffer) {
    let blob = new Blob([arrayBuffer], {
        type: "image"
    });
    let urlCreator = window.URL || window.webkitURL;
    let imageUrl = urlCreator.createObjectURL(blob);
    return imageUrl;
}

let dropdownDiv = null;
let largeNavButtonsContainer = null;

let largeNav = document.createElement('nav');
largeNav.id = "nav-large";

function buildNavLarge() {
    let navLogoContainer = document.createElement("div");
    navLogoContainer.id = "nav-logo-container";
    let logoImg = document.createElement('img');
    logoImg.src ="/images/logo-lg-cropped.jpeg"
    navLogoContainer.appendChild(logoImg);

    largeNavButtonsContainer = document.createElement("div");
    largeNavButtonsContainer.id = "nav-buttons-container";

    

    
    
    largeNav.appendChild(navLogoContainer);
    largeNav.appendChild(largeNavButtonsContainer);
    console.log(currentUser);
    if (currentUser)
        buildNavProfile(currentUser);
    

    let body = document.querySelector("body");
    body.prepend(largeNav);

    
}

function buildNavProfile(json) {
    let largeNavProfileContainer = document.createElement("div");
    largeNavProfileContainer.id = "nav-profile-container";

    let username = document.createElement("label");
    username.innerHTML = json.username;

    let profilePictureArrayBuffer = (new Uint8Array(json.profile_picture.data)).buffer;
    let avatarImg = document.createElement("img");
    avatarImg.src = generateImageUrl(profilePictureArrayBuffer);
    largeNavProfileContainer.append(username);
    largeNavProfileContainer.appendChild(avatarImg);


    largeNav.appendChild(largeNavProfileContainer);
}

function buildNavSmall() {
    // Create nav tag
    let nav = document.createElement('nav');
    nav.id = "nav-small"
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
    navAnchorImg.src = "/images/logo-icon-transparent.png";
    navAnchorImg.alt = "logo";
    navAnchor.appendChild(navAnchorImg);
    nav.appendChild(navAnchor);


    // create dropdown menu div
    dropdownDiv = document.createElement('div');
    dropdownDiv.id = "dropdown-div";
    dropdownDiv.classList.add("collapse");
    dropdownDiv.id = "navbarToggleExternalContent";

    let body = document.querySelector("body");
    body.prepend(dropdownDiv);
    body.prepend(nav);



    console.log(body.childNodes);
}


buildNavSmall();
buildNavLarge();

export function buildLink(href, innerHTML, eventName, eventListenerFunction) {
    // build for small navbar
    let container = document.createElement("div");
    container.classList.add("text-center");
    let anchor = document.createElement("a");
    anchor.href = href;
    let header = document.createElement('h5');
    header.classList.add("text-white", "h4");
    header.innerHTML = innerHTML
    anchor.appendChild(header);
    container.appendChild(anchor);
    dropdownDiv.appendChild(container);


    // build for large navbar
    let largeContainer = document.createElement("div");
    let largeAnchor = document.createElement("a");
    largeAnchor.innerHTML = innerHTML;
    largeAnchor.href = href;
    largeContainer.appendChild(largeAnchor);
    largeNavButtonsContainer.appendChild(largeContainer);


    // add event listeners
    if (eventName && eventListenerFunction) {
        // add to small navbar link
        anchor.addEventListener(eventName, eventListenerFunction)

        // add to large navbar link
        largeAnchor.addEventListener(eventName, eventListenerFunction);
    }
}




