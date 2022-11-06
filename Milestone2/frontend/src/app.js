const express = require('express');
const jwt = require('./utils/jwt');
const cookieParser = require('cookie-parser');


const app = express();
const PORT = process.env.PORT;
const html_path = __dirname + '/static/templates';

// Designate the static folder as serving static resources
app.use(express.static(__dirname + '/static'));

app.use(cookieParser())

app.get('/home', (req, res) => {
    res.sendFile(html_path + '/home.html');
});

app.get('/profile', jwt.middleware, (req, res) => {
    if (!req.valid_jwt) {
        res.redirect('/login');
        return;
    }

    res.sendFile(html_path + '/profile.html');
});

app.get('/create', jwt.middleware, (req, res) => {
    if (!req.valid_jwt) {
        res.redirect('/login');
        return;
    }

    res.sendFile(html_path + '/create.html');
});
  
app.get('/edit', jwt.middleware, (req, res) => {
    if (!req.valid_jwt) {
        res.redirect('/login');
        return;
    }

    res.sendFile(html_path + '/edit.html');
});

app.get('/tournaments/:tournamentId', jwt.middleware, (req, res) => {
    if (!req.valid_jwt) {
        res.redirect('/login');
        return;
    }

    res.sendFile(html_path + "/tournaments.html");
});

app.get('/matches/:matchId', jwt.middleware, (req, res) => {
    if (!req.valid_jwt) {
        res.redirect('/login');
        return;
    }

    res.sendFile(html_path + "/matches.html");
});

app.get('/register', (req, res) => {
    res.sendFile(html_path + "/register.html");
});

app.get('/login', (req, res) => {
    res.sendFile(html_path + "/login.html");
});

app.get('/landing', jwt.middleware, (req, res) => {
    if (!req.valid_jwt) {
        res.redirect('/login');
        return;
    }

    res.sendFile(html_path + "/landing.html");
});

// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));