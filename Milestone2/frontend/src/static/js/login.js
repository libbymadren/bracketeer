const loginButton = document.querySelector("#login-submit");
const errorBox = document.querySelector('#errorbox');

loginButton.addEventListener("click", e => {
    const username = document.querySelector('#username-input').value;
    const password = document.querySelector('#password-input').value;

    e.preventDefault();
    errorBox.classList.add("hidden");

    let body = {
        "password": password,
        "username": username
    }

    // console.log(body);

    fetch('/api/login', {
        "method": "post",
        "body": JSON.stringify(body),
        "headers": {
            "Content-Type": "application/json"
        }
    }).then(response => {
        return response.json();
    }).then(json => {
        console.log(json);
        document.location = "/landing";
    }).catch(error => {
        console.error(error);
        errorBox.classList.remove("hidden");
        errorBox.innerHTML = "Incorrect username or password";
    });
});