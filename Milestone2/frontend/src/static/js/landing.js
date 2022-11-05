const welcomeText = document.querySelector('#display-text');

fetch('api/users/current').then(res => {
    return res.json();
})
.then(loggedInUser => {
    console.log("logged in user found!");
    console.log(loggedInUser);
})