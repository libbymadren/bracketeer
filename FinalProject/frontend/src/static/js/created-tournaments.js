let currentUser = null;

let tournaments = {
    "active": [],
    "old": [],
    "upcoming": []
}

function generateImageUrl(arrayBuffer) {
    let blob = new Blob([arrayBuffer], {
        type: "image"
    });
    let urlCreator = window.URL || window.webkitURL;
    let imageUrl = urlCreator.createObjectURL(blob);
    return imageUrl;
}

// get the current user
fetch("/api/users/current").then(request => {
    return request.json();
}).then(json => {
    currentUser = json;
    getUserTournaments();
});

function getUserTournaments() {
    fetch('/api/users/' + currentUser.id + '/tournaments/created').then(response => {
        return response.json();
    }).then(json => {

        for (let tournament of json) {

            let tournamentStartDate = Date.parse(tournament.start);
            let tournamentEndDate = Date.parse(tournament.end);
            let currentDate = new Date();

            if (tournamentEndDate < currentDate && tournamentStartDate < currentDate) {
                // check if old
                console.log('old tournament');
                tournaments.old.push(tournament);
            } else if (tournamentStartDate < currentDate && tournamentEndDate > currentDate) {
                // check if active
                console.log("active tournament");
                tournaments.active.push(tournament);
            } else if (tournamentStartDate > currentDate && tournamentEndDate > currentDate) {
                // check if upcoming
                console.log("upcoming tournament");
                tournaments.upcoming.push(tournament);
            } else {
                console.error("Impossible dates")
            }
        }

        loadTournaments(tournaments.active);
    });
}

let oldButton = document.querySelector("#old-btn");
let activeButton = document.querySelector("#active-btn");
let upcomingButton = document.querySelector("#upcoming-btn");


oldButton.addEventListener("click", function(e) {
    oldButton.classList.add("active");
    activeButton.classList.remove("active");
    upcomingButton.classList.remove("active");

    // load old tournaments
    loadTournaments(tournaments.old);

});

activeButton.addEventListener("click", function(e) {
    activeButton.classList.add("active");
    oldButton.classList.remove("active");
    upcomingButton.classList.remove("active");

    // load active tournaments
    loadTournaments(tournaments.active);
});

upcomingButton.addEventListener("click", function(e) {
    upcomingButton.classList.add("active");
    activeButton.classList.remove("active");
    oldButton.classList.remove("active");
    
    // load upcoming tournaments
    loadTournaments(tournaments.upcoming)
});

function loadTournaments(tournaments){
    let tournamentsContainer = document.querySelector("#tournaments-container");

    // remove tournaments
    console.log("clear cards");
    while (tournamentsContainer.firstChild)
        tournamentsContainer.removeChild(tournamentsContainer.firstChild);

    for (let tournament of tournaments) {
        console.log(tournament);

        console.log("create tournament card");
        let tournamentCard = document.createElement('div');
        tournamentCard.classList.add("tournament-card");

        // create header div
        let tournamentCardHeader = document.createElement('div');
        tournamentCardHeader.classList.add("tournament-header")

        // add header info
        let bannerArrayBuffer = (new Uint8Array(tournament.picture.data)).buffer;
        let headerImage = document.createElement("img");
        headerImage.src = generateImageUrl(bannerArrayBuffer);
        let headerTitleContainer = document.createElement("div");
        let headerTitle = document.createElement("h2");
        headerTitle.innerHTML = tournament.name;
        tournamentCardHeader.appendChild(headerImage);
        headerTitleContainer.appendChild(headerTitle);
        tournamentCardHeader.appendChild(headerTitleContainer);
        tournamentCard.appendChild(tournamentCardHeader);



        // create info div
        let tournamentCardInfo = document.createElement('div');
        tournamentCardInfo.classList.add("tournament-info");

        // create organizer field
        let organizerContainer = document.createElement("div");
        let organizer = document.createElement('label');
        organizer.innerHTML = "<strong>Organizer: </strong>" + tournament.organizer_id; //TODO replace with actual orgainzer name
        organizerContainer.appendChild(organizer);
        tournamentCardInfo.appendChild(organizerContainer);

        // create location field
        let locationContainer = document.createElement("div");
        let location = document.createElement('label');
        location.innerHTML = "<strong>Location: </strong>" + tournament.location;
        locationContainer.appendChild(location);
        tournamentCardInfo.appendChild(locationContainer);

        // create start field
        let startContainer = document.createElement("div");
        let start = document.createElement('label');
        start.innerHTML = "<strong>Starts: </strong>" + tournament.start;
        startContainer.appendChild(start);
        tournamentCardInfo.appendChild(startContainer);

        // create end field
        let endContainer = document.createElement("div");
        let end = document.createElement('label');
        end.innerHTML = "<strong>Ends: </strong>" + tournament.end;
        endContainer.appendChild(end);
        tournamentCardInfo.appendChild(endContainer);



        tournamentCard.appendChild(tournamentCardInfo);


        tournamentCard.addEventListener("click", function(e) {
            window.location = "/tournaments/" + tournament.id;
        });

        tournamentsContainer.appendChild(tournamentCard);

    }
}