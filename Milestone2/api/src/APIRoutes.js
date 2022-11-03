const express = require('express');
const apiRouter = express.Router();


const data_path = __dirname + '/data/';

const TournamentDAO = require('./data/TournamentDAO');

let users = require(data_path + 'users.json');
let tournaments = require(data_path + 'tournaments.json');
let matches = require(data_path + 'matches.json');

apiRouter.use(express.json());

// ----------------------------------------------------
// USERS API
// ----------------------------------------------------

// Get all users
apiRouter.get('/users', (req,  res) => {
    res.json(users);
});

// Get specific user
apiRouter.get('/users/:userId', (req,  res) => {
    const userId = req.params.userId;
    let user = users.find(user => user.id == userId);

    if(user) {
        res.json(user);
    }
    else {
        res.status(404).json({error: 'User not found'});
    }
});

// Get all matches for a specific user
apiRouter.get('/users/:userId/matches', (req,  res) => {
    const userId = req.params.userId;
    let userMatches = matches.filter(match => match.participant_one == userId || match.participant_two == userId);
    if(userMatches) {

        res.json(userMatches);
    }
    else {
        res.status(404).json({error: 'No matches found for this user'});
    }
});

// Delete a user
apiRouter.delete('/users/:userId', (req,  res) => {
    const userId = req.params.userId;
    let user = users.find(user => user.id == userId);

    if(user) {
        users.splice(users.indexOf(user), 1);
        res.json(users);
    }
    else {
        res.status(404).json({error: 'User not found'});
    }
});

// Create a user
apiRouter.post('/users', (req,  res) => {
    let newUser = req.body;
    let user = users.find(user => user.username == newUser.username || user.email == newUser.email);
    
    if (user) {
        if (user.username == newUser.username) {
            res.status(409).json({error: 'User with this username already exists'});
        }
        else {
            res.status(409).json({error: 'User with this email already exists'});
        }
    }
    else {
        newUser['id'] = users.length;
        users.push(newUser);
        res.json(newUser);
    }
});

// Update a user
apiRouter.put('/users/:userId', (req,  res) => {
    const userId = req.params.userId;
    let newUser = req.body;
    let user = users.find(user => user.id == userId);

    if (user) {
        users[users.indexOf(user)] = newUser;
        res.json(newUser);
    }
    else {
        res.status(404).json({error: 'User not found'});
    }
});



// ----------------------------------------------------
// TOURNAMENTS API
// ----------------------------------------------------

// Get all tournaments
apiRouter.get('/tournaments', (req,  res) => {
    TournamentDAO.getTournaments().then(tournaments => {
        res.json(tournaments);
      })
      .catch(err => {
        res.status(400).json({error: err});
      });
});

// Create a specific tournament
apiRouter.post('/tournaments', (req, res) => {
    let newTournament = req.body;
    newTournament = TournamentDAO.createTournament(newTournament).then(tournament => {
        res.json(tournament);
    });
 });

// Update a specific tournament
apiRouter.put('/tournaments/:tournamentId', (req, res) => {
    const tournamentId = req.params.tournamentId;
    let tournament = req.body;
    tournament = TournamentDAO.updateTournament(tournament, tournamentId).then(tournament => {
        res.json(tournament);
    })
});

// delete a tournament
apiRouter.delete('/tournaments/:tournamentId', (req, res) => {
    const tournamentId = req.params.tournamentId;
    TournamentDAO.getUserById(tournamentId).then(tournaments => {
        res.json(tournaments);
    })
    .catch(err => {
        res.status(500).json({error: err});
    });
});

// get tournament by id
apiRouter.get('/tournaments/:tournamentId', (req, res) => {
    const tournamentId = req.params.tournamentId;

    TournamentDAO.getTournamentById(tournamentId).then(tournament => {
        if(tournament) {
            res.json(tournament);
        }
        else {
            res.status(404).json({error: 'Tournament not found'});
        }
    })
    .catch(err => {
        res.status(500).json({error: err});
    });
});

// get all matches relating to a tournament
apiRouter.get('/tournaments/:tournamentId/matches', (req, res) => {
    let targetTournamentId = req.params.tournamentId;

    // filter for only matches associated with the current tournament
    let tournamentMatches = matches.filter(match => match.tournament_id == targetTournamentId);

    if (tournamentMatches) {
        res.json(tournamentMatches);
    } else {
        res.status(404).json({error: "No matches found for tournament with id: " + targetTournamentId});
    }
});

// create a match for a tournament
apiRouter.post('/tournaments/:tournamentId/matches', (req, res) => {
    let targetTournamentId = req.params.tournamentId;

    let tournament = tournaments.find(tournament => tournament.id == targetTournamentId);

    if (tournament) {
        // if the tournament exists then add the match
        tournament.matches.push(req.body);
        res.status(200).json(req.body);
    } else {
        res.status(404).json({error: "No matches found for tournament with id: " + targetTournamentId});
    }
});

apiRouter.post('/tournaments/:tournamentId/matches', (req, res) => {
    let targetTournamentId = req.params.tournamentId;

    let tournament = tournaments.find(tournament => tournament.id == targetTournamentId);

    if (tournament) {
        // if the tournament exists then add the match
        tournament.matches = req.body;
        res.status(200).json(tournament.matches);
    } else {
        res.status(404).json({error: "No matches found for tournament with id: " + targetTournamentId});
    }
});



// ----------------------------------------------------
// AUTHENTICATION API
// ----------------------------------------------------

apiRouter.post('/join/:joinId', (req, res) => {
    let targetJoinId = req.params.tournamentId;

    let tournament = tournaments.find(tournament => tournament.join_id == targetJoinId);

    if (tournament) {
        tournament.participants.push(req.body.json.user.id);
    } else {
        res.status(404).json({error: "No tournaments found with join id: " + targetJoinId});
    }
});



// ----------------------------------------------------
// MATCHES API
// ----------------------------------------------------

apiRouter.get('/matches/:matchId', (req, res) => {
    let targetMatchId = req.params.matchId;

    let match = Object.create(matches.find(match => match.id == targetMatchId));

    

    if (match) {
        // load the participants for the match
        match.participant_one = users.find(user => user.id == match.participant_one);
        match.participant_two = users.find(user => user.id == match.participant_two);
        res.json(match);
    } else {
        res.status(404).json({error: "No match found with id: " + targetMatchId});
    }
});

// ----------------------------------------------------
// LOGIN API
// ----------------------------------------------------

apiRouter.post('/login', (req,  res) => {
    const userRequest = req.body;
    let user = users.find(user => user.username == userRequest.username && user.password == userRequest.password);
    
    if(user) {
        res.json(user)
    }
    else {
        res.status(404).json({error: 'User not found'});
    }
});

module.exports = apiRouter;