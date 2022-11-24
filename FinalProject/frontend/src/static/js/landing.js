const welcomeText = document.querySelector('#display-text');

fetch('api/users/current').then(res => {
    return res.json();
})
.then(loggedInUser => {
    welcomeText.innerHTML = "Welcome, " + loggedInUser.username + "!"
})
.catch(err => {
    console.log(err);
});