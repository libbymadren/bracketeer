const logoutLink = document.querySelector('#logout-link');


function logout(e) {
    e.preventDefault();
    fetch("/api/logout", {
        method: "POST",
        body: "{}",
        headers:{
            "Content-Type": "application/json"
    }}).then(response => {
        if (response.status == 200) {
            window.location = "/"
        }
    }).catch(err => {
        console.error(err);
    })
}