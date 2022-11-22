
document.querySelector('#join-id-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const joinId = document.querySelector('#join-id').value; 
    checkValidTournament(joinId);
});

var html5QrcodeScanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });

function onScanSuccess(decodedText, decodedResult) {
    // Handle on success condition with the decoded text or result.
    // console.log(`Scan result: ${decodedText}`, decodedResult);

    window.location = decodedText;
}

function checkValidTournament(joinId) {
    const res = fetch('/api/tournaments/join/' + joinId).then(response => {
        if (response.ok) {
            window.location = '/join/' + joinId;
        }
        else {
            document.querySelector('#error-text').innerHTML = 'Tournament not found!';
        }
    });
}

html5QrcodeScanner.render(onScanSuccess);
