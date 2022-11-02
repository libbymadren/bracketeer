const express = require('express');
const apiRouter = express.Router();


const data_path = __dirname + '/data/';

const UserDAO = require('./data/UserDAO');

let users = require(data_path + 'users.json');
let tournaments = require(data_path + 'tournaments.json');
let matches = require(data_path + 'matches.json');

apiRouter.use(express.json());

// ----------------------------------------------------
// USERS API
// ----------------------------------------------------

// Get all users
apiRouter.get('/users', (req,  res) => {
    UserDAO.getUsers().then(users => {
        res.json(users);
      })
      .catch(err => {
        res.status(400).json({error: err});
      });
});

// Get specific user
apiRouter.get('/users/:userId', (req,  res) => {
    const userId = req.params.userId;
    UserDAO.getUserById(userId).then(user => {
        if(user) {
            res.json(user);
        }
        else {
            res.status(404).json({error: 'User not found'});
        }
    })
    .catch(err => {
        res.status(500).json({error: err});
    });
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
    UserDAO.getUserById(userId).then(users => {
        res.json(users);
    })
    .catch(err => {
        res.status(500).json({error: err});
    });
});

// Create a user
apiRouter.post('/users', (req,  res) => {
    let newUser = req.body;
    newUser = UserDAO.createUser(newUser).then(user => {
        res.json(user);
    });
});

// Update a user
apiRouter.put('/users/:userId', (req,  res) => {
    const userId = req.params.userId;
    let user = req.body;
    user = UserDAO.updateUser(user, userId).then(user => {
        res.json(user);
    })
});



// ----------------------------------------------------
// TOURNAMENTS API
// ----------------------------------------------------

// Get all tournaments
apiRouter.get('/tournaments', (req,  res) => {
    res.json(tournaments);
});

// Create a specific tournament
apiRouter.post('/tournaments', (req, res) => {

    //Check if all fields are provided and are valid:
    if(!req.params.id.toString().match(/^[0-9]{3,}$/g) ||
        !req.body.picture ||
        !req.body.name ||
        !req.body.organizer_id.toString().match(/^[0-9]{3,}$/g) ||
        !req.body.address || 
        !req.body.description ||
        !req.body.created || 
        !req.body.start ||
        !req.body.address || 
        !req.body.participants){
       
       res.status(404).json({error: 'Could not update tournaments'});
    } else {

        // Create new tournament
        tournaments.push({
            id: req.params.id,
            picture: req.body.picture,
            name: req.body.name,
            organizer_id: req.body.organizer_id,
            address: req.body.address,
            description: req.body.description,
            created: req.body.created,
            start: req.body.start,
            participants: req.body.participants
        });

       res.json(tournament);
    }
 });

// Update a specific tournament
apiRouter.put('/tournaments/:tournamentId', (req, res) => {

    //Check if all fields are provided and are valid:
    if(!req.params.id.toString().match(/^[0-9]{3,}$/g) ||
        !req.body.picture ||
        !req.body.name ||
        !req.body.organizer_id.toString().match(/^[0-9]{3,}$/g) ||
        !req.body.address || 
        !req.body.description ||
        !req.body.created || 
        !req.body.start ||
        !req.body.address || 
        !req.body.participants){
       
       res.status(404).json({error: 'Could not update tournaments'});
    } else {

       // Gets us the index of tournament with given id.
       var updateIndex = tournaments.map( (tournament) => {
            return tournament.id;
       }).indexOf(parseInt(req.params.id));
       
       if(updateIndex === -1){
            // Tournament not found
            res.status(404).json({error: 'Tournament not found'});
       } else {
            // Update existing tournament
            tournaments[updateIndex] = {
                id: req.params.id,
                picture: req.body.picture,
                name: req.body.name,
                organizer_id: req.body.organizer_id,
                address: req.body.address,
                description: req.body.description,
                created: req.body.created,
                start: req.body.start,
                participants: req.body.participants
            };
       }

       res.json(tournament);
    }
});

// delete a tournament
apiRouter.delete('/tournaments/:tournamentId', (req, res) => {
    var removeIndex = tournaments.map((tournament) => {
       return tournament.id;
    }).indexOf(req.params.id); //Gets us the index of tournament with given id.
    
    if(removeIndex === -1){
        res.status(404).json({error: 'Tournament not found'});
    } else {
        tournaments.splice(removeIndex, 1);
        res.json(tournament);
    }
});

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