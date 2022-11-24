
const queryParams = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop)
});

let targetTournamentId = queryParams.id;


let matches = [];
let participants = [];
let tournament = null;

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
        roundButton.value = "Round " + i;
        roundButton.classList.add("btn", "btn-danger");
        roundButton.addEventListener("click", function(e) {
            for (let child of buttonGroup.children)
                child.classList.remove("active");
            e.target.classList.add("active");
            generateRoundDisplay(e.target.value.replace("Round ", ""));
        });
        buttonGroup.appendChild(roundButton);
    }
    console.log(buttonGroup);
    buttonGroup.firstElementChild.classList.add("active");
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

    let roundCardContainer = document.createElement('div');
    roundCardContainer.classList.add("round-card-container");
    let matchNumberLabel = document.createElement("label");
    matchNumberLabel.innerHTML = match.number;
    roundCardContainer.appendChild(matchNumberLabel);

    // get participant two
    let participant_two = participants.filter(participant => participant.id == match.participant_two_id)[0];
    console.log(participant_two);

    // generate round card
    let roundCard = document.createElement('div');
    roundCard.classList.add("round-card");

    let participantOneContainer = document.createElement('div');
    participantOneContainer.classList.add("participant-container");
    if (participant_one) {
        // add participant one info to container
        let participantOneAvatar = document.createElement("img");
        let participantOneArrayBuffer = (new Uint8Array(participant_one.profile_picture.data)).buffer;
        participantOneAvatar.src = generateImageUrl(participantOneArrayBuffer);

        let participantOneUsernameLabel = document.createElement('label');
        participantOneUsernameLabel.innerHTML = "<strong>" + participant_one.username + "</strong>";
        participantOneContainer.appendChild(participantOneAvatar);
        participantOneContainer.appendChild(participantOneUsernameLabel);
    } else {
        let participantOneAvatar = document.createElement("i");
        participantOneAvatar.classList.add("fa-solid", "fa-user");

        let participantOneUsernameLabel = document.createElement('label');
        let dependentMatches = matches.filter(dependentMatch => dependentMatch.next_match_number == match.number);
        let dependentMatch = dependentMatches[0];
        participantOneUsernameLabel.innerHTML = "<strong>" + "To be determined by match " + dependentMatch.number + "</strong>";
        participantOneContainer.appendChild(participantOneAvatar);
        participantOneContainer.appendChild(participantOneUsernameLabel);
    }

    let participantTwoContainer = document.createElement('div');
    participantTwoContainer.classList.add("participant-container");
    if (participant_two) {
        // add participant two info to container
        let participantTwoAvatar = document.createElement("img");
        let participantTwoArrayBuffer = (new Uint8Array(participant_two.profile_picture.data)).buffer;
        participantTwoAvatar.src = generateImageUrl(participantTwoArrayBuffer);

        let participantTwoUsernameLabel = document.createElement('label');
        participantTwoUsernameLabel.innerHTML = "<strong>" + participant_two.username + "</strong>";
        participantTwoContainer.appendChild(participantTwoAvatar);
        participantTwoContainer.appendChild(participantTwoUsernameLabel);
    } else {
        let participantTwoAvatar = document.createElement("i");
        participantTwoAvatar.classList.add("fa-solid", "fa-user");

        let participantTwoUsernameLabel = document.createElement('label');
        let dependentMatches = matches.filter(dependentMatch => dependentMatch.next_match_number == match.number);
        let dependentMatch = null
        if (dependentMatches.length > 1) {
            dependentMatch = dependentMatches[1];
        } else {
            dependentMatch = dependentMatches[0];
        }
        participantTwoUsernameLabel.innerHTML = "<strong>" + "To be determined by match " + dependentMatch.number + "</strong>";
        participantTwoContainer.appendChild(participantTwoAvatar);
        participantTwoContainer.appendChild(participantTwoUsernameLabel);
    }

    if (match.winner_id) {
        // if there is already a winner, build card to show winner

        if (match.winner_id == participant_one.id) {

            // add the winner selection buttons
            let winnerButtonContainerOne = document.createElement('div');
            winnerButtonContainerOne.classList.add("winner-button-container")
            let winnerSelectionButtonOne = document.createElement("div");
            winnerSelectionButtonOne.classList.add("winner-button", "p1", "btn", "btn-danger", "border-0");
            let crownIconOne = document.createElement("i");
            crownIconOne.classList.add("fa-solid", "fa-medal");
            winnerSelectionButtonOne.appendChild(crownIconOne);

            winnerSelectionButtonOne.classList.remove("winner-button", "btn", "btn-danger");
            winnerSelectionButtonOne.classList.add("winner-display", "bg-success", "text-white", "border-white");
            participantOneContainer.classList.add("winner");
            participantTwoContainer.classList.add("loser");

            winnerButtonContainerOne.appendChild(winnerSelectionButtonOne);
            participantOneContainer.appendChild(winnerButtonContainerOne);


        } else if (match.winner_id == participant_two.id) {

            let winnerButtonContainerTwo = document.createElement('div');
            winnerButtonContainerTwo.classList.add("winner-button-container")
            let winnerSelectionButtonTwo = document.createElement("div");
            winnerSelectionButtonTwo.classList.add("winner-button", "p2", "btn", "btn-danger", "border-0");
            let crownIconTwo = document.createElement("i");
            crownIconTwo.classList.add("fa-solid", "fa-medal");
            winnerSelectionButtonTwo.appendChild(crownIconTwo);

            winnerSelectionButtonTwo.classList.remove("winner-button", "btn", "btn-danger");
            winnerSelectionButtonTwo.classList.add("winner-display", "bg-success", "text-white", "border-white");
            participantOneContainer.classList.add("loser");
            participantTwoContainer.classList.add("winner");

            winnerButtonContainerTwo.appendChild(winnerSelectionButtonTwo);
            participantTwoContainer.appendChild(winnerButtonContainerTwo);

        }

    } else if (participant_one && participant_two) {
        // add the winner selection buttons
        let winnerButtonContainerOne = document.createElement('div');
        winnerButtonContainerOne.classList.add("winner-button-container")
        let winnerSelectionButtonOne = document.createElement("div");
        winnerSelectionButtonOne.classList.add("winner-button", "p1", "btn", "btn-danger", "border-0");
        let crownIconOne = document.createElement("i");
        crownIconOne.classList.add("fa-solid", "fa-medal");
        winnerSelectionButtonOne.appendChild(crownIconOne);


        let winnerButtonContainerTwo = document.createElement('div');
        winnerButtonContainerTwo.classList.add("winner-button-container")
        let winnerSelectionButtonTwo = document.createElement("div");
        winnerSelectionButtonTwo.classList.add("winner-button", "p2", "btn", "btn-danger", "border-0");
        let crownIconTwo = document.createElement("i");
        crownIconTwo.classList.add("fa-solid", "fa-medal");
        winnerSelectionButtonTwo.appendChild(crownIconTwo);

        winnerSelectionButtonOne.addEventListener("click", function(e) {
            // save the match

            match.winner_id = match.participant_one_id;
            let nextMatch = matches.filter(nextMatch => nextMatch.number == match.next_match_number)[0];
            

            fetch("/api/matches", {
                "method": "PUT",
                "body": JSON.stringify(match),
                "headers": {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                if (response.status == 200) {
                    winnerSelectionButtonOne.classList.remove("winner-button", "btn", "btn-danger");
                    winnerSelectionButtonOne.classList.add("winner-display", "bg-success", "text-white", "border-white");
                    winnerSelectionButtonTwo.style.display = "none";
                    participantOneContainer.classList.add("winner");
                    participantTwoContainer.classList.add("loser");

                    if (nextMatch.participant_one_id) {
                        nextMatch.participant_two_id = match.participant_one_id;
                    } else {
                        nextMatch.participant_one_id = match.participant_one_id;
                    }

                    fetch("/api/matches", {
                        "method": "PUT",
                        "body": JSON.stringify(nextMatch),
                        "headers": {
                            "Content-Type": "application/json"
                        }
                    }).then(response => {
                        if (response.status == 200) {
                        }
                    }).catch(err => {
                        console.error(err);
                    });
                }
            }).catch(err => {
                console.error(err);
            });

            
        });

        winnerSelectionButtonTwo.addEventListener("click", function(e) {

            match.winner_id = match.participant_two_id;
            

            // save the match
            fetch("/api/matches", {
                "method": "PUT",
                "body": JSON.stringify(match),
                "headers": {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                if (response.status == 200) {
                    winnerSelectionButtonTwo.classList.remove("winner-button", "btn", "btn-danger");
                    winnerSelectionButtonTwo.classList.add("winner-display", "bg-success", "text-white", "border-white");
                    winnerSelectionButtonOne.style.display = "none";
                    participantOneContainer.classList.add("loser");
                    participantTwoContainer.classList.add("winner");
                    let nextMatch = matches.filter(nextMatch => nextMatch.number == match.next_match_number)[0];
                    if (nextMatch.participant_one_id) {
                        nextMatch.participant_two_id = match.participant_two_id;
                    } else {
                        nextMatch.participant_one_id = match.participant_two_id;
                    }
                    
                    fetch("/api/matches", {
                        "method": "PUT",
                        "body": JSON.stringify(nextMatch),
                        "headers": {
                            "Content-Type": "application/json"
                        }
                    }).then(response => {
                        if (response.status == 200) {
                        }
                    }).catch(err => {
                        console.error(err);
                    });

                }
            }).catch(err => {
                console.error(err);
            });

            


        });


        winnerButtonContainerOne.appendChild(winnerSelectionButtonOne);
        participantOneContainer.appendChild(winnerButtonContainerOne);

        winnerButtonContainerTwo.appendChild(winnerSelectionButtonTwo);
        participantTwoContainer.appendChild(winnerButtonContainerTwo);
    }


    roundCard.append(participantOneContainer);
    roundCard.append(document.createElement('hr'))
    roundCard.append(participantTwoContainer);

    roundCardContainer.append(roundCard);

    return roundCardContainer;

}

