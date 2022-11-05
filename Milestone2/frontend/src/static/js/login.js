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
        console.log(response.status);
        if (response.status == 200) {
            console.log("Navigating to home")
            window.location.replace("/home");
        }
    }).catch(error => {
        console.error(error);
    })
});

// loginButton.addEventListener("click", e => {
//     const username = document.querySelector('#username-input').value;
//     const password = document.querySelector('#password-input').value;

//     e.preventDefault();
//     errorBox.classList.add("hidden");

//     let body = {
//         "password": password,
//         "username": username
//     }

//     fetch('/api/login', {
//         "method": "post",
//         "body": JSON.stringify(body),
//         "headers": {
//             "Content-Type": "application/json"
//         }
//     }).then(response => {
//         console.log(response.status);
//         if (response.status == 200) {
//             console.log("Navigating to home")
//             window.location.href = "/home";
//         }
//     }).catch(error => {
//         console.error(error);
//     })

//     // fetch('/api/login', {
//     //     "method": "post",
//     //     "body": JSON.stringify(body),
//     //     "headers": {
//     //         "Content-Type": "application/json"
//     //     }
//     // }).then(response => {
//     //     if (!response.ok) {
//     //         errorBox.classList.remove("hidden");
//     //         errorBox.innerHTML = "Incorrect username or password";
//     //     }
//     //     else {
//     //         document.location = "/landing";
//     //     }
//     // })
//     // .catch(err => {
//     //     console.log(err);
//     //     errorBox.classList.remove("hidden");
//     //     errorBox.innerHTML = "Incorrect username or password";
//     // });
// });