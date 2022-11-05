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
    }).catch(error => {
        console.error(error);
    })

    // fetch('/api/login', {
    //     "method": "post",
    //     "body": JSON.stringify(body),
    //     "headers": {
    //         "Content-Type": "application/json"
    //     }
    // }).then(response => {
    //     if (!response.ok) {
    //         errorBox.classList.remove("hidden");
    //         errorBox.innerHTML = "Incorrect username or password";
    //     }
    //     else {
    //         document.location = "/landing";
    //     }
    // })
    // .catch(err => {
    //     console.log(err);
    //     errorBox.classList.remove("hidden");
    //     errorBox.innerHTML = "Incorrect username or password";
    // });
});