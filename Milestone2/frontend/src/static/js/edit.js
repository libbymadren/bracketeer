const editForm = document.querySelector('#edit');
console.log(editForm);

editForm.reset();

let tournamentId = ("" + window.location).split('/').at(-1);
console.log(tournamentId);


fetch('/api/tournaments/' + tournamentId).then(response => {
    console.log(response);
    return response.json();
}).then(json => {
    console.log(json);

    const name = document.createElement('h4');
    name.innerText = "Tournament Name: " + json.name;

    const banner = document.createElement('h4');
    banner.innerText += "Banner: " + json.picture;

    const desc = document.createElement('h4');
    desc.innerText += "Description: " + json.description;

    const start = document.createElement('h4');
    start.innerText += "Start Date: " + json.start;

    const location = document.createElement('h4');
    location.innerText += "Location: " + json.location;

    document.querySelector('#currentInfo').appendChild(name);
    document.querySelector('#currentInfo').appendChild(banner);
    document.querySelector('#currentInfo').appendChild(desc);
    document.querySelector('#currentInfo').appendChild(start);
    document.querySelector('#currentInfo').appendChild(location);

    editForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const data = new FormData(e.target);

        const newTournament = {
            id: json.id,
            picture: json.picture, // data.get('image') NEED LINK
            name: data.get('name') || json.name,
            organizer_id: json.organizer_id,
            location: data.get('location') || json.location,
            description: data.get('description') || json.description,
            created: json.created,
            start: data.get('start') || json.start,
            join_id: json.join_id
        }

        console.log(newTournament);

        fetch('/api/tournaments/' + tournamentId, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTournament),
            })
            .then(response => {
                console.log(response.status);
                if (response.status == 200) {
                    console.log("Navigating to updated tournament")
                    window.location.replace("/tournaments/" + newTournament.id);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
         });
    });
});