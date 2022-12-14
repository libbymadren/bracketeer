let currentUser = null;

// get the current user
fetch('/api/users/current').then(response => {
    return response.json();
}).then(json => {
    currentUser = json;
}).catch(err => {
    console.error(err);
});

const createForm = document.querySelector('#create');

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

createForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    let bannerImage = await loadFile(e.target.elements.banner.files[0]);
    let description = e.target.elements.description.value;
    let location = e.target.elements.location.value;
    let name = e.target.elements.name.value;
    let start = e.target.elements.start.value;
    let end = e.target.elements.end.value;

    //let now = new Date(Date.now()).toISOString();
    let now = new Date();

    // console.log(now.toString())
    // console.log(start.toString())
    // console.log(end.toString())
    // console.log(start.toString() < now.toString())
    // console.log(end.toString() < now.toString())
    // console.log(start.toString() > end.toString())

    if (start < now) {
        document.create.start.focus();
        alert("Please provide a future start date.")
    } else if (end < now) {
        document.create.end.focus();
        alert("Please provide a future end date.")
    } else if (start > end) {
        document.create.end.focus();
        alert("Please provide a date that occurs after the tournament's start date.")
    } else {

        let data = {
            picture: bannerImage,
            name: name,
            organizer_id: currentUser.id,
            location: location,
            description: description,
            created: new Date(Date.now()).toLocaleDateString(),
            start: start,
            end: end
        }

        console.log(e.target.elements.banner);

        console.log(data);

        fetch("/api/tournaments", {
            method: "POST",
            body: JSON.stringify(data),
                "headers": {
                    "Content-Type": "application/json"
                }
        }).then(response => {
            console.log("POST /api/tournaments: ", response.statusText)

            // handle if the file is too large
            if (response.status == 413) {
                console.log("Banner image too large.")
            } else if (response.status = 200) {
                return response.json()
            }

        }).then(json => {
            window.location = "/tournaments?id=" + json.id;
        }).catch(err => {
            console.error(err)
        })

    }
});