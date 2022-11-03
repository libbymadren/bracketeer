const express = require('express');
const UserDAO = require('./data/UserDAO');
const MatchDAO = require('./data/MatchDAO');
const { User } = require('./data/models/User');
const jwt = require('./utils/jwt')
let users = require(data_path + 'users.json');
let tournaments = require(data_path + 'tournaments.json');
let matches = require(data_path + 'matches.json');

const apiRouter = express.Router();
const data_path = __dirname + '/data/';



apiRouter.use(express.json());

// ----------------------------------------------------
// USERS API
// ----------------------------------------------------

// Get all users
apiRouter.get('/users', jwt.middleware, (req,  res) => {
    if (!req.valid_jwt) {
        res.status(401).json({"error": "Authentication Failed"});
        return;
    }

    UserDAO.getUsers().then(users => {
        res.json(users);
      })
      .catch(err => {
        res.status(400).json({error: err});
      });
});

// Get specific user
apiRouter.get('/users/:userId', jwt.middleware, (req,  res) => {
    if (!req.valid_jwt) {
        res.status(401).json({"error": "Authentication Failed"});
        return;
    }

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
apiRouter.get('/users/:userId/matches', jwt.middleware, (req,  res) => {
    if (!req.valid_jwt) {
        res.status(401).json({"error": "Authentication Failed"});
        return;
    }

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
apiRouter.delete('/users/:userId', jwt.middleware, (req,  res) => {
    if (!req.valid_jwt) {
        res.status(401).json({"error": "Authentication Failed"});
        return;
    }

    const userId = req.params.userId;
    UserDAO.getUserById(userId).then(users => {
        res.json(users);
    })
    .catch(err => {
        res.status(500).json({error: err});
    });
});

// Create a user
apiRouter.post('/users', jwt.middleware, (req,  res) => {
    if (!req.valid_jwt) {
        res.status(401).json({"error": "Authentication Failed"});
        return;
    }

    let newUser = req.body;
    newUser = UserDAO.createUser(newUser).then(user => {
        res.json(user);
    });
});

// Update a user
apiRouter.put('/users/:userId', jwt.middleware, (req,  res) => {
    if (!req.valid_jwt) {
        res.status(401).json({"error": "Authentication Failed"});
        return;
    }

    const userId = req.params.userId;
    let user = req.body;
    user = UserDAO.updateUser(user, userId).then(user => {
        res.json(user);
    })
});


apiRouter.get('/users/current', jwt.middleware, (req, res) => {
    if (!req.valid_jwt) {
        res.status(401).json({"error": "Authentication Failed"});
        return;
    }

    console.log("User:");
    res.json(req.user);
    console.log(req.user);
});


// ----------------------------------------------------
// TOURNAMENTS API
// ----------------------------------------------------

// Get all tournaments
apiRouter.get('/tournaments', jwt.middleware, (req,  res) => {
    if (!req.valid_jwt) {
        res.status(401).json({"error": "Authentication Failed"});
        return;
    }

    res.json(tournaments);
});

// Create a specific tournament
apiRouter.post('/tournaments', jwt.middleware, (req, res) => {
    if (!req.valid_jwt) {
        res.status(401).json({"error": "Authentication Failed"});
        return;
    }

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
apiRouter.put('/tournaments/:tournamentId', jwt.middleware, (req, res) => {
    if (!req.valid_jwt) {
        res.status(401).json({"error": "Authentication Failed"});
        return;
    }

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
apiRouter.delete('/tournaments/:tournamentId', jwt.middleware, (req, res) => {
    if (!req.valid_jwt) {
        res.status(401).json({"error": "Authentication Failed"});
        return;
    }

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
apiRouter.get('/tournaments/:tournamentId', jwt.middleware, (req, res) => {
    if (!req.valid_jwt) {
        res.status(401).json({"error": "Authentication Failed"});
        return;
    }

    let targetTournamentId = req.params.tournamentId;

    let tournament = tournaments.find(tournament => tournament.id == targetTournamentId);

    if (tournament) {
        res.json(tournament);
    } else {
        res.status(404).json({error: "Tournament not found"});
    }
});

// get all matches relating to a tournament
apiRouter.get('/tournaments/:tournamentId/matches', jwt.middleware, (req, res) => {
    if (!req.valid_jwt) {
        res.status(401).json({"error": "Authentication Failed"});
        return;
    }

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
apiRouter.post('/tournaments/:tournamentId/matches', jwt.middleware, (req, res) => {
    if (!req.valid_jwt) {
        res.status(401).json({"error": "Authentication Failed"});
        return;
    }

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

// ----------------------------------------------------
// JOIN API
// ----------------------------------------------------

apiRouter.post('/join/:joinId', jwt.middleware, (req, res) => {
    if (!req.valid_jwt) {
        res.status(401).json({"error": "Authentication Failed"});
        return;
    }

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
    if (!req.valid_jwt) {
        res.status(401).json({"error": "Authentication Failed"});
        return;
    }

    let targetMatchId = req.params.matchId;

    MatchDAO.getMatchById(targetMatchId).then(match => {
        res.json(match);
    }).catch(err => {
        res.status(400).json({error: err});
    });
});

// ----------------------------------------------------
// AUTHENTICATION API
// ----------------------------------------------------

apiRouter.post('/login', (req,  res) => {

    // search the database for the user by credentials
    try {
        let user = UserDAO.getUserByCredentials(req.body.username, req.body.password);

        // Create a JWT for the user
        let payload = {
            "id": user.id,
            "username": user.username,
            "profile_picture": user.profile_picture            
        }

        jwt.generateToken(req, res, payload);

    } catch(err) {
        console.log(err.message);
        res.status(401).json({"error": "Authentication failed"});
    }

});

apiRouter.post('/register', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let profile_picture = req.body.profile_picture;

    let newUser = new User({
        "username": username,
        "profile_picture": profile_picture
    });

    newUser.setPasswordHash(password);

    try {
        let addedUser = UserDAO.createUser(newUser);
        res.status(200).json({"user": addedUser.toJSON()});
    } catch(err) {
        res.status(500).json({"error": "Could not register user"});
    }
    

});

apiRouter.post('/logout', (req, res) => {
    jwt.removeToken(req, res);
});

module.exports = apiRouter;