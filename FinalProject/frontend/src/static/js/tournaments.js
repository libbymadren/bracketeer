import { currentUser } from "/js/common.js";

// utility functions
function generateImageUrl(arrayBuffer) {
    let blob = new Blob([arrayBuffer], {
        type: "image"
    });
    let urlCreator = window.URL || window.webkitURL;
    let imageUrl = urlCreator.createObjectURL(blob);
    return imageUrl;
}
function formatDatetime(date) {
    const datetime = new Date(date);
    let hours = datetime.getUTCHours();
    let minutes = datetime.getUTCMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+ minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    return (datetime.getUTCMonth()+1) + "/" + datetime.getUTCDate() + "/" + datetime.getUTCFullYear() + "  " + strTime;
}

const queryParams = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop)
});

// global variables
let tournament = null;
let participants = null;



fetch('/api/tournaments/' + queryParams.id).then(response => {
    console.log(response);
    return response.json();
}).then(json => {
    // set the global variable
    tournament = json;


    // header and info box will always be visible
    // only needs tournament information
    // should be built right away
    buildHeader();
    buildInfo();

    getOrgainizerUsername();

    // check to see if the current user is the owner of the tournament
    // if so, build the owner buttons
    if (tournament.organizer_id == currentUser.id)
        buildOwnerButtons();

    // if the tournament's matches havent been generated, then build the
    // join container and add participants view
    if (!tournament.matches_generated) {
        buildJoin();
        getParticipants();
    } else {
        // make a call to get the participants
        getParticipants();
    }

    // update the view based on tournament state
    updateView();

    

}).catch(err => {
    console.error(err);
    window.location = '/error';
});


// functions to get and build participant info
function getParticipants() {
    fetch("/api/tournaments/" + tournament.id + "/participants").then(response => {
        return response.json()
    }).then(json => {
        // set the global participants variable
        participants = json;

        buildParticipants();

    }).catch(err => {
        console.error(err);
    })
}
function buildParticipants() {
    let participantsContainer = document.querySelector("#participants-container");

    for (let participant of participants) {

        let pContainer = document.createElement('div');
        pContainer.className = "participant-info"
        let pImg = document.createElement('img');
        let profilePictureArrayBuffer = (new Uint8Array(participant.profile_picture.data)).buffer;
        pImg.src = generateImageUrl(profilePictureArrayBuffer);
        let pUsr = document.createElement('label');
        pUsr.innerHTML = participant.username;
        pContainer.appendChild(pImg);
        pContainer.appendChild(pUsr);

        pContainer.addEventListener("click", function(e) {
            window.location = "/profile?username=" + participant.username;
        });

        pContainer.classList.add('participant-card');
        participantsContainer.appendChild(pContainer);
    }
}

// info box will always be built
function buildInfo() {
    let tournamentInfo = document.querySelector("#tournament-info-container");
    
    // create organizer field
    let organizerContainer = document.querySelector('#organizer-container');
    let organizer = document.createElement('label');
    organizer.id="organizer-username";
    organizerContainer.appendChild(organizer);

    // create location field
    let locationContainer = document.querySelector('#location-container');
    let location = document.createElement('label');
    location.innerHTML = tournament.location;
    locationContainer.appendChild(location);

    // create description field
    let descriptionContainer = document.querySelector('#description-container');
    let description = document.createElement('p');
    description.innerHTML = tournament.description;
    descriptionContainer.appendChild(description);

    // create created field
    let createdContainer = document.querySelector('#created-container');
    let created = document.createElement('label');
    created.innerHTML = tournament.created;
    createdContainer.appendChild(created);

    // create start field
    let startContainer = document.querySelector('#starts-container');
    let start = document.createElement('label');
    start.innerHTML = formatDatetime(tournament.start);
    startContainer.appendChild(start);

    // create end field
    let endContainer = document.querySelector("#ends-container");
    let end = document.createElement('label');
    end.innerHTML = formatDatetime(tournament.end);
    endContainer.appendChild(end);

    
}

// header box will always be built
function buildHeader() {
    
    
    let bannerArrayBuffer = (new Uint8Array(tournament.picture.data)).buffer;

    let tournamentHeader = document.querySelector("#tournament-header");
    document.querySelector("#tournament-header img").src = generateImageUrl(bannerArrayBuffer);
    let tournamentHeaderName = document.querySelector("#tournament-header h2");
    tournamentHeaderName.innerHTML = tournament.name;
}

// build buttons for the organizer to generate matches or edit tournament
function buildOwnerButtons() {
    let buttonsContainer = document.querySelector('#buttons-container');
        
    // add the generate match button
    let generateButton = document.createElement("input");
    generateButton.id = "generate-button";
    generateButton.type = "button";
    generateButton.classList.add("btn", "btn-outline-primary")
    generateButton.value = "Generate Matches";
    generateButton.addEventListener("click", function(e) {
        fetch("/api/tournaments/" + tournament.id + "/matches", {
            "method": "POST",
            "body": "{}"
        }).then(response => {
            console.log(response.status, response.statusText);
            if (response.status == 200) {
                tournament.matches_generated = 1;
                updateView();
            }
        }).catch(err => {
            console.error(err);
        });
    })
    buttonsContainer.appendChild(generateButton);

    // add the edit tournament button
    const editTournament = document.createElement('input');
    editTournament.id = "edit-button";
    editTournament.type = 'button';
    editTournament.value = 'Edit Tournament';
    editTournament.classList.add('btn');
    editTournament.classList.add('btn-outline-primary');
    editTournament.addEventListener("click", function(e) {
        window.location = "/tournaments/edit/" + tournament.id;
    });
    buttonsContainer.appendChild(editTournament);
}

function buildJoin() {
    let joinIdAnchor = document.querySelector("#join-id-anchor");

    // create the qr code
    let joinURL = "http://localhost/join/" + tournament.join_id;
    let qrCode = new QRCode("qr-code", {
        text: joinURL,
        width: 300,
        height: 300,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
    joinIdAnchor.innerHTML = joinURL;
    joinIdAnchor.href = joinURL;
}

// updates the view based on if the matches are generated or not
function updateView() {

    // show and hide certain containers
    let mc = document.querySelector("#matches-container");
    let jc = document.querySelector("#join-container");
    let pc = document.querySelector("#participants-container");
    let pch = document.querySelector("#participants-header-container")
    let gb = document.querySelector("#generate-button");
    if (!tournament.matches_generated) {
        if (mc) mc.style.display = "none";
        if (jc) jc.style.display = "flex";
        if (pc) pc.style.display = "flex";
        if (pch) pch.style.display = "flex";
        if (gb) gb.style.display = "inherit";
    } else {
        if (jc) jc.style.display = "none";
        if (mc) mc.style.display = "flex";
        if (pc) pc.style.display = "none";
        if (pch) pch.style.display = "none";
        if (gb) gb.style.display = "none";

        let script = document.createElement('script');
        script.src = "/js/matches.js";
        script.type = "module";
        let css = document.createElement("link");
        css.href = "/css/matches.css";
        css.rel = "stylesheet";
        document.body.appendChild(script);
        document.body.appendChild(css);
    }
}

function getOrgainizerUsername() {
    fetch("/api/users?id=" + tournament.organizer_id).then(response => {
        if (response.status == 200) {
            return response.json();
        }
    }).then(json => {
        // create organizer field
        let organizer = document.querySelector('#organizer-username');
        organizer.innerHTML = json.username;
    });
}

function userValidation() {

    if (currentUser.id !== organizerId) {
        let validParticipant = participants.find(participant => participant.id == loggedInUser.id);

        if (!validParticipant) {
            const main = document.querySelector('main');
            main.innerHTML = '';

            const errorText = document.createElement('h1');
            errorText.id = 'display-text';
            errorText.classList.add('display-3');
            errorText.classList.add('text-center');
            errorText.innerText = 'You must be an organizer or participant of this tournament to view this page!';
            main.appendChild(errorText);

        }
    }

}
