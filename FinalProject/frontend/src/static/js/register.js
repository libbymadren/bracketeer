const registerButton = document.querySelector("#register-button");
const errorBox = document.querySelector('#errorbox');

let croppieContainer = document.querySelector("#croppie-container");
croppieContainer.style.display = "none";

const registerForm = document.querySelector('#register');

opts={
    viewport: {
        width: 200,
        height: 200,
        type: "circle"
    }
}
let c = new Croppie(croppieContainer, opts);

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.querySelector('#username-input').value;
    const password = document.querySelector('#password-input').value;
    const passwordRepeat = document.querySelector('#password-repeat-input').value;
    const avatar = await c.result({
        type: "base64",
        size: "viewport",
        format: "png",
        quality: 1,
        circle: true
    });

    errorBox.classList.add("hidden");

    if (password !== passwordRepeat) {
        errorBox.classList.remove("hidden");
        errorBox.innerHTML = "Passwords do not match";
    }

    else {
        let body = {
            "password": password,
            "username": username,
            "profile_picture": avatar.split(',')[1]
        }
    
        console.log(body);
    
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
            } else {
                let data = {
                    "username": username,
                    "password": password
                }

                fetch("/api/login", {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(response => {
                    if (response.status == 200) {
                        window.location = "/";
                    } else {
                        window.location = "/login";
                    }
                })
            }
        });
    }
});

// async function to wait for a file to be loaded into base64
async function loadFile(file){
    return new Promise((resolve, reject) => {
        // get the binary data of the selected file
        let reader = new FileReader();
        reader.onload = function() {
            resolve(window.btoa(reader.result))
        }
        reader.readAsBinaryString(file);
    });
}

function generateImageUrl(arrayBuffer) {
    let blob = new Blob([arrayBuffer], {
        type: "image"
    });
    let urlCreator = window.URL || window.webkitURL;
    let imageUrl = urlCreator.createObjectURL(blob);
    return imageUrl;
}




let filePicker = document.querySelector("#formFile");

filePicker.addEventListener("change", async function(e) {
    croppieContainer.style.display = "inherit";
    let base64 = await loadFile(e.target.files[0]);
    let decoded = window.atob(base64);
    console.log(decoded);
    let byteArray = new Uint8Array(decoded.length);
    for (let i = 0; i < decoded.length; i++)
        byteArray[i] =  decoded.charCodeAt(i);
    console.log(byteArray);
    let imageUrl = generateImageUrl(byteArray);
    console.log(imageUrl);

    c.bind({
        url: imageUrl
    });
});