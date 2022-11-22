
let joinId = ("" + window.location).split('/').at(-1);
console.log(joinId);

function populateImage(query, arrayBuffer) {
    let blob = new Blob([arrayBuffer], {
        type: "image"
    });
    let urlCreator = window.URL || window.webkitURL;
    let imageUrl = urlCreator.createObjectURL(blob);
    let imageTag = document.querySelector(query);
    imageTag.src = imageUrl;
}


fetch('/api/tournaments/join/' + joinId).then(response => {
    console.log(response);
    return response.json();
}).then(json => {
    console.log(json);

    let bannerArrayBuffer = (new Uint8Array(json.picture.data)).buffer;
    console.log(bannerArrayBuffer);


    let tournamentHeaderName = document.querySelector("#tournament-header h2");
    populateImage("#tournament-header img", bannerArrayBuffer)
    tournamentHeaderName.innerHTML = json.name;


    let tournamentInfo = document.querySelector("#tournament-info-container");
    
    // create organizer field
    let organizerContainer = document.querySelector('#organizer-container');
    let organizer = document.createElement('label');
    organizer.innerHTML = json.organizer_id; //TODO replace with actual orgainzer name
    organizerContainer.appendChild(organizer);

    // create location field
    let locationContainer = document.querySelector('#location-container');
    let location = document.createElement('label');
    location.innerHTML = json.location;
    locationContainer.appendChild(location);

    // create description field
    let descriptionContainer = document.querySelector('#description-container');
    let description = document.createElement('p');
    description.innerHTML = json.description;
    descriptionContainer.appendChild(description);

    // create created field
    let createdContainer = document.querySelector('#created-container');
    let created = document.createElement('label');
    created.innerHTML = json.created;
    createdContainer.appendChild(created);

    // create start field
    let startContainer = document.querySelector('#starts-container');
    let start = document.createElement('label');
    start.innerHTML = json.start;
    startContainer.appendChild(start);

})
.catch(err => {
    window.location = '/join-error';
    console.log(err);
});

document.querySelector("#yes-btn").addEventListener("click", function(e) {
    fetch('/api/tournaments/join/' + joinId, {
        "method": "PUT"
    }).then(response => {
        if (response.status = 200) {
            return response.json()
        } else {
            throw new Error(response.status + response.statusText);
        }
    }).then(json => {
        console.log(json);
        window.location = '/tournaments/' + json.tournament.id;
    }).catch(err => {
        console.error(err);
    });
});


document.querySelector("#no-btn").addEventListener("click", function(e) {
    window.location = '/tournaments/join';
});

