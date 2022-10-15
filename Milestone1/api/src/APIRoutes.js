const express = require('express');
const apiRouter = express.Router();

const data_path = __dirname + '/data/';

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


// ----------------------------------------------------
// TOURNAMENTS API
// ----------------------------------------------------

// get tournament by id
apiRouter.get('/tournaments/:tournamentId', (req, res) => {

    let targetTournamentId = req.params.tournamentId;

    let tournament = tournaments.find(tournament => tournament.id == targetTournamentId);

    if (tournament) {
        res.json(tournament);
    } else {
        res.status(404).json({error: "Tournament not found"});
    }
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

    let match = matches.find(match => match.id == targetMatchId);

    if (match) {
        res.json(match);
    } else {
        res.status(404).json({error: "No match found with id: " + targetMatchId});
    }
});

module.exports = apiRouter;