


let targetMatchId = ("" + window.location).split('/').at(-1);
console.log(targetMatchId);

fetch("/api/matches/" + targetMatchId).then(response => {
    console.log(response);
    return response.json();
}).then(json => {
    console.log(json);

    let pOne = json.participant_one;
    let pTwo = json.participant_two;

    let pOneContainer = document.querySelector("#participant-one-container");
    let pTwoContainer = document.querySelector("#participant-two-container");

    let pOneImg = document.createElement('img');
    pOneImg.src = pOne.profile_picture;

    let pOneUsername = document.createElement('label');
    pOneUsername.innerHTML = pOne.username;


    let pTwoImg = document.createElement('img');
    pTwoImg.src = pTwo.profile_picture;

    let pTwoUsername = document.createElement('label');
    pTwoUsername.innerHTML = pTwo.username;


    pOneContainer.appendChild(pOneImg);
    pOneContainer.appendChild(pOneUsername);

    pTwoContainer.appendChild(pTwoImg);
    pTwoContainer.appendChild(pTwoUsername);



})