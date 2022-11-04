let registerForm = document.querySelector("#form-container form");
registerForm.addEventListener("submit", function(e) {
    e.preventDefault();

    let password = e.target.elements.password.value;
    let username = e.target.elements.username.value;

    let body = {
        "password": password,
        "username": username
    }

    console.log(body);

    fetch('/api/register', {
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
});