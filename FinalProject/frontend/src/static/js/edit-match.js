

let targetMatchId = ("" + window.location).split('/').at(-1);
console.log(targetMatchId);

// fetch("/api/matches/" + targetMatchId).then(response => {
//     console.log(response);
//     return response.json();
// }).then(json => {

    let p1 =     {
        "username": "Barrett64",
        "profile_picture": "https://robohash.org/Barrett64"
      };

    let p2 = {
        "username": "Smith55",
        "profile_picture": "https://robohash.org/Smith55"
      };

    let json = {
        participant_one: p1,
        participant_two: p2
    }






    console.log(json)

    let pOne = json.participant_one;
    let pTwo = json.participant_two;

    console.log(pOne)
    console.log(pTwo)

    let pOneContainer = document.querySelector("#participant-one-container");
    let pTwoContainer = document.querySelector("#participant-two-container");

    let pOneImg = document.createElement('img');
    pOneImg.src = pOne.profile_picture;

    let pOneUsername = document.querySelector('#participant-one-name')
    pOneUsername.value = pOne.username;

    let pTwoImg = document.createElement('img');
    pTwoImg.src = pTwo.profile_picture;

    let pTwoUsername = document.querySelector('#participant-two-name')
    pTwoUsername.value = pTwo.username;
    
    pOneContainer.insertBefore(pOneImg, pOneContainer.firstChild)
    pTwoContainer.insertBefore(pTwoImg, pTwoContainer.firstChild)


    let pOneWinner = document.querySelector('#participant-one-winner')
    pOneWinner.innerHTML = pOne.username;

    let pTwoWinner = document.querySelector('#participant-two-winner')
    pTwoWinner.innerHTML = pTwo.username;


// })