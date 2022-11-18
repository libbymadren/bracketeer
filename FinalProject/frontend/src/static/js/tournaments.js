let targetTournamentId = ("" + window.location).split('/').at(-1);
console.log(targetTournamentId);

function generateImageUrl(arrayBuffer) {
    let blob = new Blob([arrayBuffer], {
        type: "image"
    });
    let urlCreator = window.URL || window.webkitURL;
    let imageUrl = urlCreator.createObjectURL(blob);
    return imageUrl;
}

fetch('/api/tournaments/' + targetTournamentId).then(response => {
    console.log(response);
    return response.json();
}).then(json => {
    console.log(json);
    buildHeader(json);
    buildInfo(json);
    buildJoin(json);
    getParticipants(json);
});


function buildInfo(json) {
    let tournamentInfo = document.querySelector("#tournament-info-container");
    
    // create organizer field
    let organizerContainer = document.querySelector('#organizer-container');
    let organizer = document.createElement('label');
    organizer.innerHTML = json.organizer_id; //TODO replace with actual orgainzer name
    organizerContainer.appendChild(organizer);

    // create location field
    let locationContainer = document.querySelector('#location-container');
    let location = document.createElement('label');
    location.innerHTML = json.location;
    locationContainer.appendChild(location);

    // create description field
    let descriptionContainer = document.querySelector('#description-container');
    let description = document.createElement('p');
    description.innerHTML = json.description;
    descriptionContainer.appendChild(description);

    // create created field
    let createdContainer = document.querySelector('#created-container');
    let created = document.createElement('label');
    created.innerHTML = json.created;
    createdContainer.appendChild(created);

    // create start field
    let startContainer = document.querySelector('#starts-container');
    let start = document.createElement('label');
    start.innerHTML = json.start;
    startContainer.appendChild(start);

    // create end field
    let endContainer = document.querySelector("#ends-container");
    let end = document.createElement('label');
    end.innerHTML = json.end;
    endContainer.appendChild(end);
}

function buildHeader(json) {
    

    let bannerArrayBuffer = (new Uint8Array(json.picture.data)).buffer;

    let tournamentHeader = document.querySelector("#tournament-header");
    document.querySelector("#tournament-header img").src = generateImageUrl(bannerArrayBuffer);
    let tournamentHeaderName = document.querySelector("#tournament-header h2");
    tournamentHeaderName.innerHTML = json.name;
}

function buildJoin(json) {
    let joinIdAnchor = document.querySelector("#join-id-anchor");

    // create the qr code
    let joinURL = "http://localhost/join/" + json.join_id;
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

function getParticipants(json) {
    const organizerId = json.organizer_id;
    let participants;
    fetch("/api/tournaments/" + json.id + "/participants").then(response => {
        return response.json()
    }).then(json => {
        participants = json;
        console.log(json);
        // get the current logged in user
        return fetch('/api/users/current');
    })
    .then(res => {
        return res.json();
    })
    .then(loggedInUser => {
        if (loggedInUser.id !== organizerId) {
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

        buildParticipants(participants);
    })
    .catch(err => {
        console.error(err);
    });
}

function buildParticipants(json) {
    let participantsContainer = document.querySelector("#participants-container");

    for (let participant of json) {

        let pContainer = document.createElement('div');
        pContainer.className = "participant-info"
        let pImg = document.createElement('img');
        // let avatarArray = Uint8Array(participant.avatar);
        // pImg.src = generateImageUrl(avatarArray);
        let pUsr = document.createElement('label');
        pUsr.innerHTML = participant.username;
        pContainer.appendChild(pImg);
        pContainer.appendChild(pUsr);

        participantsContainer.appendChild(pContainer);
    }
}