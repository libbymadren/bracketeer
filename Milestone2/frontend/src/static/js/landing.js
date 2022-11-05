const welcomeText = document.querySelector('#display-text');

fetch('api/users/current').then(loggedInUser => {
    console.log(loggedInUser);
})