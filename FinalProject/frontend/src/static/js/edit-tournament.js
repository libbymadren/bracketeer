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

fetch('/api/tournaments/' + tournamentId).then(response => {
    console.log(response);
    return response.json();
}).then(json => {
    console.log(json);

    const name = document.querySelector('#name')
    name.value = json.name;

    // const banner = document.querySelector('#formFile')
    // banner.value += json.picture;

    const desc = document.querySelector('#description')
    desc.value += json.description;

    const start = document.querySelector('#start')
    start.value += (json.start).substring(0, 16);

    const end = document.querySelector('#end')
    end.value += (json.end).substring(0, 16);

    const location = document.querySelector('#location')
    location.value += json.location;

    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = new FormData(e.target);

        const newTournament = {
            id: json.id,
            // picture: await loadFile(e.target.elements.banner.files[0]) || json.picture,
            name: data.get('name') || json.name,
            location: data.get('location') || json.location,
            description: data.get('description') || json.description,
            start: data.get('start') || json.start,
            end: data.get('end') || json.end,
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
            window.location.replace("/tournaments/" + json.id);
        }).catch(err => {
            console.error(err)
        })
    });
});