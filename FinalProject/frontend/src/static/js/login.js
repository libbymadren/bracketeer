const loginButton = document.querySelector("#login-submit");
const errorBox = document.querySelector('#errorbox');

const form = document.querySelector('#form-container form');


form.addEventListener("submit", function (e) {
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;

    e.preventDefault();
    errorBox.classList.add("hidden");

    let body = {
        "password": password,
        "username": username
    }

    fetch('/api/login', {
        "method": "post",
        "body": JSON.stringify(body),
        "headers": {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if (!response.ok) {
            errorBox.classList.remove("hidden");
            errorBox.innerHTML = "Incorrect username or password";
        }
        else {
            document.location = "/landing";
        }
    }).catch(error => {
        console.error(error);
    });
});
