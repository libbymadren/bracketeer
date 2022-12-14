const express = require('express');
const jwt = require('./utils/jwt');
const cookieParser = require('cookie-parser');


const app = express();
const PORT = process.env.PORT;
const html_path = __dirname + '/static/templates';

// Designate the static folder as serving static resources
app.use(express.static(__dirname + '/static'));

app.use(cookieParser());

app.get('/join/:joinId', jwt.middleware, (req, res) => {
    if (!req.valid_jwt) {
        res.redirect('/login')
        return;
    }
    res.sendFile(html_path + "/join.html");
});

app.get('/error', jwt.middleware, (req, res) => {
    if (!req.valid_jwt) {
        res.redirect('/login')
        return;
    }
    res.sendFile(html_path + "/error.html");
});

app.get('/tournaments/join', jwt.middleware, (req, res) => {
    if (!req.valid_jwt) {
        res.redirect('/login')
        return;
    }
    res.sendFile(html_path + "/join-tournament.html");
});

app.get('/tournaments/entered', jwt.middleware, (req, res) => {
    if (!req.valid_jwt) {
        res.redirect('/login');
        return;
    }
    res.sendFile(html_path + "/entered-tournaments.html");
})

app.get('/tournaments/created', jwt.middleware, (req, res) => {
    if (!req.valid_jwt) {
        res.redirect('/login');
        return;
    }
    res.sendFile(html_path + "/created-tournaments.html");
})

app.get('/', jwt.middleware, (req, res) => {
    if (!req.valid_jwt) {
        res.sendFile(html_path + '/home.html');
    } else {
        res.sendFile(html_path + "/landing.html");
    }
});

app.get('/profile', jwt.middleware, (req, res) => {
    if (!req.valid_jwt) {
        res.redirect('/login');
        return;
    }

    res.sendFile(html_path + '/profile.html');
});

app.get('/tournaments/create', jwt.middleware, (req, res) => {
    if (!req.valid_jwt) {
        res.redirect('/login');
        return;
    }

    res.sendFile(html_path + '/create-tournament.html');
});
  
app.get('/tournaments/edit/:tournamentId', jwt.middleware, (req, res) => {
    if (!req.valid_jwt) {
        res.redirect('/login');
        return;
    }
    res.sendFile(html_path + '/edit-tournament.html');
});

app.get('/tournaments', jwt.middleware, (req, res) => {
    if (!req.valid_jwt) {
        res.redirect('/login');
        return;
    }

    res.sendFile(html_path + "/tournament.html");

});

app.get('/tournaments/matches', jwt.middleware, (req, res) => {
    if (!req.valid_jwt) {
        res.redirect('/login');
        return;
    }

    res.sendFile(html_path + "/matches.html");
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

app.get('/offline', (req,  res) => {
    res.sendFile(html_path + "/offline.html");
});

// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));