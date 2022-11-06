const logoutLink = document.querySelector('#logout-link');

logoutLink.addEventListener('click', e => {
    fetch('/api/logout', {
        "method": "post",
        "body": '',
        "headers": {
            "Content-Type": "application/json"
        }
    }).then(response => {
        document.location = "/login";
    }).catch(error => {
        console.error(error);
    });
})