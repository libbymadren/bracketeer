const express = require('express');

const app = express();
const PORT = process.env.PORT;
const html_path = __dirname + '/static/templates';

// Designate the static folder as serving static resources
app.use(express.static(__dirname + '/static'));

app.get('/home', (req, res) => {
    res.sendFile(html_path + '/home.html');
});

app.get('/profile', (req, res) => {
    res.sendFile(html_path + '/profile.html');
});


app.get('/create', (req, res) => {
    res.sendFile(html_path + '/create.html');
});
  
app.get('/edit', (req, res) => {
    res.sendFile(html_path + '/edit.html');
});

app.get('/tournaments/:tournamentId', (req, res) => {
    res.sendFile(html_path + "/tournaments.html");
});


// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));