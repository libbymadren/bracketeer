


let targetTournamentId = ("" + window.location).split('/').at(-1);
// console.log(targetTournamentId);

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
  
    let tournament = json

    fetch('/api/users/current').then(response => {
        return response.json();
    }).then(user => {
        buildMatchButton(user, tournament);
    })
}).catch(err => {
     window.location = '/error';
});


function buildInfo(json) {
    console.log(json);
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
    start.innerHTML = formatDatetime(json.start);
    startContainer.appendChild(start);

    // create end field
    let endContainer = document.querySelector("#ends-container");
    let end = document.createElement('label');
    end.innerHTML = formatDatetime(json.end);
    endContainer.appendChild(end);

    
}

function buildMatchButton(user, tournament) {
    let tournamentInfo = document.querySelector("#tournament-info-container");

    // create view matches button if matches exist
    if (tournament.matches_generated) {
        let viewBtn = document.createElement("input");
        viewBtn.type = "button";
        viewBtn.value = "View Matches"
        viewBtn.classList.add("btn", "btn-outline-primary");
        viewBtn.addEventListener("click", function(e) {
            window.location = "/tournaments/" + tournament.id + "/matches";
        })
        tournamentInfo.appendChild(viewBtn);
    } else if (user.id = tournament.organizer_id) {
        console.log("Orgainizer");

        let generateButton = document.createElement("input");
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
                    // hide the join container
                    let joinContainer = document.querySelector("#join-container");
                    joinContainer.style.display = "none";

                    // hide the generate matches button
                    generateButton.style.display = "none";

                    // show the view button
                    let viewBtn = document.createElement("input");
                    viewBtn.type = "button";
                    viewBtn.value = "View Matches"
                    viewBtn.classList.add("btn", "btn-outline-primary");
                    viewBtn.addEventListener("click", function(e) {
                        window.location = "/tournaments/" + tournament.id + "/matches";
                    })
                    tournamentInfo.appendChild(viewBtn);


                }
            }).catch(err => {
                console.error(err);
            });
        })
        tournamentInfo.appendChild(generateButton);

    }
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
        // if the logged in user is the organizer, show the edit tournament button
        else {
            const editTournament = document.createElement('input');
            editTournament.type = 'button';
            editTournament.value = 'Edit Tournament';
            editTournament.classList.add('btn');
            editTournament.classList.add('btn-outline-primary');
            editTournament.onclick = 'editTournament()';
            document.querySelector('#tournament-buttons').prepend(editTournament);
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
        let profilePictureArrayBuffer = (new Uint8Array(participant.profile_picture.data)).buffer;
        pImg.src = generateImageUrl(profilePictureArrayBuffer);
        let pUsr = document.createElement('label');
        pUsr.innerHTML = participant.username;
        pContainer.appendChild(pImg);
        pContainer.appendChild(pUsr);

        participantsContainer.appendChild(pContainer);
    }
}

function editTournament() {
    window.location = "/tournaments/edit/" + targetTournamentId;
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
