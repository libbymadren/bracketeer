const registerButton = document.querySelector("#register-button");
const errorBox = document.querySelector('#errorbox');

registerButton.addEventListener("click", function(e) {
    const username = document.querySelector('#username-input').value;
    const password = document.querySelector('#password-input').value;
    const passwordRepeat = document.querySelector('#password-repeat-input').value;
    const avatar = document.querySelector('#avatar-input').value;

    e.preventDefault();

    errorBox.classList.add("hidden");

    if (password !== passwordRepeat) {
        errorBox.classList.remove("hidden");
        errorBox.innerHTML = "Passwords do not match";
    }

    else {
        let body = {
            "password": password,
            "username": username,
            "profile_picture": avatar
        }
    
        // console.log(body);
    
        fetch('/api/register', {
            "method": "post",
            "body": JSON.stringify(body),
            "headers": {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (!response.ok) {
                errorBox.classList.remove("hidden");
                errorBox.innerHTML = "User with username already exists";
            }
            else {
                document.location = "/login";
            }
        });
    }
});