const createForm = document.querySelector('#create');

createForm.reset();

createForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    fetch('/api/tournaments').then(response => {
        console.log(response);
        return response.json();
    }).then(tournaments => {
        const newTournament = {
            id: tournaments.length + 1,
            picture: data.get('image'),
            name: data.get('name'),
            organizer_id: 1, // CHANGE THIS LATER, NEED A getUserByUsername() API ROUTE
            location: data.get('location'),
            description: data.get('description'),
            created: Date.now(),
            start: data.get('start'),
            join_id: genRandonString(10),
            participants: []
        }

        fetch('/api/tournaments', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTournament),
            })
            .then((response) => response.json())
            // .then((data) => {
            //     // Upon creating successfully, notify the user
                
            // })
            .catch((error) => {
                console.error('Error:', error);
         });
    });
});

function genRandonString(length) {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charLength = chars.length;
    var result = '';
    for ( var i = 0; i < length; i++ ) {
       result += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
 }