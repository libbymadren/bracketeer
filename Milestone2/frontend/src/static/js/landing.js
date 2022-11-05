const welcomeText = document.querySelector('#display-text');

fetch('api/users/current').then(res => {
    return res.json();
})
.then(loggedInUser => {
    console.log("logged in user found!");
    document.querySelector('#profile-link').href = "/profile/" + loggedInUser.id;

    welcomeText.innerHTML = "Welcome, " + loggedInUser.username + "!"
})
.catch(err => {
    console.log(err);
})