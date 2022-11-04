let tournamentId = ("" + window.location).split('/').at(-1);

const editForm = document.querySelector('#edit');

editForm.reset();

editForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    fetch('/api/tournaments/' + tournamentId).then(response => {
        console.log(response);
        return response.json();
    }).then(tournament => {
        console.log(json);

        const newTournament = {
            id: tournament.id,
            picture: data.get('image'),
            name: data.get('name'),
            organizer_id: tournament.organizer_id,
            location: data.get('location'),
            description: data.get('description'),
            created: tournament.created,
            start: data.get('start'),
            join_id: tournament.join_id,
            participants: tournament.participants
        }

        fetch('/api/tournaments/' + tournamentId, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTournament),
            })
            .then((response) => response.json())
            // .then((data) => {
            //     // Upon creating successfully, notify the user
                
            // })
            .catch((error) => {
                console.error('Error:', error);
         });
    });
});