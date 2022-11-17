let currentUser = null;

let tournaments {
    "active": [],
    "old": [],
    "upcoming": []
}

// get the current user
fetch("/api/users/current").then(request => {
    return request.json();
}).then(json => {
    currentUser = json;
    getUserTournaments();
});

function getUserTournaments() {
    fetch('/api/users/' + currentUser.id + '/tournaments').then(response => {
        return response.json();
    }).then(json => {


        
    


        buildTournamentCards(json);
    });
}

function buildTournamentCards(json) {
    console.log(json);
}