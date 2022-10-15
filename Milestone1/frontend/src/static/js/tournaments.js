

let targetTournamentId = ("" + window.location).split('/').at(-1);
console.log(targetTournamentId);

fetch('/api/tournaments/' + targetTournamentId).then(response => {
    console.log(response);
    return response.json();
}).then(json => {
    console.log(json);

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
    let joinIdAnchor = document.querySelector("#join-id-anchor");
    joinIdAnchor.innerHTML = joinURL;
    joinIdAnchor.href = joinURL;


    let tournamentHeader = document.querySelector("#tournament-header");
    let tournamentHeaderImg = document.querySelector("#tournament-header img");
    let tournamentHeaderName = document.querySelector("#tournament-header h2");
    tournamentHeaderImg.src = json.picture;
    tournamentHeaderName.innerHTML = json.name;


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


    let participantsContainer = document.querySelector("#participants-container");

    for (let participant of json.participants) {

        let pContainer = document.createElement('div');
        pContainer.className = "participant-info"
        let pImg = document.createElement('img');
        pImg.src = "https://robohash.org/" + Math.random();
        let pUsr = document.createElement('label');
        pUsr.innerHTML = participant.id;
        pContainer.appendChild(pImg);
        pContainer.appendChild(pUsr);

        participantsContainer.appendChild(pContainer);

    }

});