const query = window.location.search;
let parameters = new URLSearchParams(query);
let id = parameters.get('id');

let profileUser;

fetch('api/users/current').then(res => {
    return res.json();
})
.then(loggedInUser => {
    document.querySelector('#profile-link').href = "/profile?id=" + loggedInUser.id;
})
.catch(err => {
    console.log(err);
});

fetch('api/users/byId/' + id).then(res => {
    return res.json();
})
.then(user => {
    profileUser = user;
    document.querySelector('#profile-username').innerHTML = profileUser.username;
    document.querySelector('#profile-picture').src = profileUser.profile_picture;

    return fetch('api/users/' + profileUser.id + '/tournaments');
})
.then(res => {
    if (res.ok) {
        return res.json();
    }
})
.then(tournaments => {
    if (tournaments) {
        const totalTournamentsEntered = document.querySelector('#total-tournaments-enetered');
        totalTournamentsEntered.innerHTML = tournaments.length;

        const recentTournamentsList = document.querySelector('#recent-tournaments-list');
        tournaments.forEach(tournament => {
            const card = document.createElement('div');
            card.classList.add('card');

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
            cardBody.classList.add('d-flex');
            cardBody.classList.add('align-items-center');

            const tournamentImage = document.createElement('img');
            tournamentImage.classList.add('tournament-image');
            tournamentImage.classList.add('rounded-circle');
            tournamentImage.src = tournament.picture;

            const tournamentText = document.createElement('div');
            tournamentText.classList.add('ms-3');

            const tournamentTitle = document.createElement('span');
            tournamentTitle.classList.add('h5');
            tournamentTitle.classList.add('card-title');
            tournamentTitle.innerHTML = tournament.name;

            tournamentText.appendChild(tournamentTitle);
            cardBody.appendChild(tournamentImage);
            cardBody.appendChild(tournamentText);
            card.appendChild(cardBody);
            recentTournamentsList.appendChild(card);
        })

        return fetch('api/users/' + profileUser.id + '/matches');
    }    
})
.then(res => {
    if (res && res.ok) {
        return res.json();
    }
})
.then(matches => {
    if (matches) {
        const totalMatchesPlayed = document.querySelector('#total-matches-played');
        totalMathcesPlayed.innerHTML = matches.length;
    }
});