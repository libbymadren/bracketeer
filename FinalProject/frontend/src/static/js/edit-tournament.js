const editForm = document.querySelector('#edit');
// console.log(editForm);

editForm.reset();

let tournamentId = ("" + window.location).split('/').at(-1);
console.log(tournamentId);

// async function to wait for a file to be loaded into base64
async function loadFile(file){
    return new Promise((resolve, reject) => {
        // get the binary data of the selected file
        let reader = new FileReader();
        reader.onload = function() {
            resolve(window.btoa(reader.result))
        }
        reader.readAsBinaryString(file);
    });
}

let tournament = null;
fetch('/api/tournaments/' + tournamentId).then(response => {
    console.log(response);
    return response.json();
}).then(json => {
    tournament = json;
    buildForm();
})

function buildForm() {
    console.log(tournament);

    const name = document.querySelector('#name')
    name.value = tournament.name;

    const desc = document.querySelector('#description')
    desc.value += tournament.description;

    const start = document.querySelector('#start')
    start.value += (tournament.start).substring(0, 16);

    const end = document.querySelector('#end')
    end.value += (tournament.end).substring(0, 16);

    const location = document.querySelector('#location')
    location.value += tournament.location;

    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = new FormData(e.target);

        const newTournament = {
            id: tournament.id,
            // picture: await loadFile(e.target.elements.banner.files[0]) || tournament.picture,
            name: data.get('name') || tournament.name,
            location: data.get('location') || tournament.location,
            description: data.get('description') || tournament.description,
            start: data.get('start') || tournament.start,
            end: data.get('end') || tournament.end,
        }

        console.log(e.target.elements.banner);

        console.log(newTournament);

        fetch('/api/tournaments/' + tournamentId, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTournament),
        }).then(response => {
            console.log("PUT /api/tournaments: ", response.statusText)

            // handle if the file is too large
            if (response.status == 413) {
                console.log("Banner image too large.")
            } else if (response.status == 200) {
                console.log("Navigating to updated tournament")
                return response.json()
            }
        }).then(json => {
            window.location.replace("/tournaments?id=" + json.id);
        }).catch(err => {
            console.error(err)
        })
    });
};