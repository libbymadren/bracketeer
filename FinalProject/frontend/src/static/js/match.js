let targetTournamentId = ("" + window.location).split('/').at(-2);
console.log(targetTournamentId);

let matches = [];
let participants = [];

function generateImageUrl(arrayBuffer) {
    let blob = new Blob([arrayBuffer], {
        type: "image"
    });
    let urlCreator = window.URL || window.webkitURL;
    let imageUrl = urlCreator.createObjectURL(blob);
    return imageUrl;
}

fetch("/api/tournaments/" + targetTournamentId + "/matches").then(response => {
    console.log(response);
    return response.json();
}).then(json => {
    console.log(json);
    matches = json;

    let numberOfRounds = 0;
    for (let match of json) {
        if (match.round > numberOfRounds){
            numberOfRounds = match.round;
        }
    }
    numberOfRounds++;

    generateRoundButtons(numberOfRounds);

    getTournamentParticipants();

}).catch(err => {
    console.error(err);
});

function generateRoundButtons(numberOfRounds) {
    let buttonGroup = document.querySelector(".btn-group");
    for (let i = 1; i <= numberOfRounds; i++) {
        let roundButton = document.createElement("input");
        roundButton.type = "button";
        roundButton.value = i;
        roundButton.classList.add("btn", "btn-danger");
        roundButton.addEventListener("click", function(e) {
            generateRoundDisplay(e.target.value);
        });
        buttonGroup.appendChild(roundButton);
    }
}

function getTournamentParticipants() {
    fetch("/api/tournaments/" + targetTournamentId + "/participants").then(response => {
        return response.json();
    }).then(json => {
        console.log(json);
        participants = json;
        generateRoundDisplay(1);
    }).catch(err => {
        console.error(err);
    });
}

function generateRoundDisplay(roundNumber) {
    console.log("Generate round display");
    let roundContainer = document.querySelector("#round-container");

    // remove everything from round container
    while(roundContainer.firstChild)
        roundContainer.removeChild(roundContainer.firstChild);


    // get all the matches for the round
    let roundMatches = matches.filter(match => match.round == roundNumber - 1)

    console.log(roundMatches);

    // build round cards
    for (let match of roundMatches) {
        roundContainer.appendChild(buildRoundCard(match));
    }

}


function buildRoundCard(match) {

    console.log("Building round card");
    console.log(match);

    // get participant one
    let participant_one = participants.filter(participant => participant.id == match.participant_one_id)[0];
    console.log(participant_one);

    // get participant two
    let participant_two = participants.filter(participant => participant.id == match.participant_two_id)[0];
    console.log(participant_two);

    // generate round card
    let roundCard = document.createElement('div');
    roundCard.classList.add("round-card");

    // add participant one info to container
    let participantOneContainer = document.createElement('div');
    participantOneContainer.classList.add("participant-container");
    let participantOneAvatar = document.createElement("img");
    let participantOneArrayBuffer = (new Uint8Array(participant_one.profile_picture.data)).buffer;
    participantOneAvatar.src = generateImageUrl(participantOneArrayBuffer);
    let participantOneUsernameLabel = document.createElement('label');
    participantOneUsernameLabel.innerHTML = "<strong>" + participant_one.username + "</strong>";
    participantOneContainer.appendChild(participantOneAvatar);
    participantOneContainer.appendChild(participantOneUsernameLabel);

    // add participant two info to container
    let participantTwoContainer = document.createElement('div');
    participantTwoContainer.classList.add("participant-container");
    let participantTwoAvatar = document.createElement("img");
    let participantTwoArrayBuffer = (new Uint8Array(participant_two.profile_picture.data)).buffer;
    participantTwoAvatar.src = generateImageUrl(participantTwoArrayBuffer);
    let participantTwoUsernameLabel = document.createElement('label');
    participantTwoUsernameLabel.innerHTML = "<strong>" + participant_two.username + "</strong>";
    participantTwoContainer.appendChild(participantTwoAvatar);
    participantTwoContainer.appendChild(participantTwoUsernameLabel);


    roundCard.append(participantOneContainer);
    roundCard.append(document.createElement('hr'))
    roundCard.append(participantTwoContainer);

    return roundCard;

}


