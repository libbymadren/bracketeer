const express = require('express');
const UserDAO = require('./data/UserDAO');
const MatchDAO = require('./data/MatchDAO');
const User = require('./data/models/User');
const jwt = require('./utils/jwt')
const TournamentDAO = require('./data/TournamentDAO');
// let users = require(data_path + 'users.json');
// let tournaments = require(data_path + 'tournaments.json');
// let matches = require(data_path + 'matches.json');

const apiRouter = express.Router();
const data_path = __dirname + '/data/';


const cookieParser = require('cookie-parser');
apiRouter.use(cookieParser());

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

    let currentUserInfo = {
        "username": req.jwt_payload.username,
        "profile_picture": req.jwt_payload.profile_picture
    }

    res.json(currentUserInfo);
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

    TournamentDAO.getTournaments().then(tournaments => {
        res.json(tournaments);
      })
      .catch(err => {
        res.status(400).json({error: err});
      });
});

// Create a specific tournament
apiRouter.post('/tournaments', jwt.middleware, (req, res) => {
    if (!req.valid_jwt) {
        res.status(401).json({"error": "Authentication Failed"});
        return;
    }

    let newTournament = req.body;
    newTournament = TournamentDAO.createTournament(newTournament).then(tournament => {
        res.json(tournament);
    });
 });

// Update a specific tournament
apiRouter.put('/tournaments/:tournamentId', jwt.middleware, (req, res) => {
    if (!req.valid_jwt) {
        res.status(401).json({"error": "Authentication Failed"});
        return;
    }


    const tournamentId = req.params.tournamentId;
    let tournament = req.body;
    tournament = TournamentDAO.updateTournament(tournament, tournamentId).then(tournament => {
        res.json(tournament);
    })
});

// delete a tournament
apiRouter.delete('/tournaments/:tournamentId', jwt.middleware, (req, res) => {
    if (!req.valid_jwt) {
        res.status(401).json({"error": "Authentication Failed"});
        return;
    }


    const tournamentId = req.params.tournamentId;
    TournamentDAO.getUserById(tournamentId).then(tournaments => {
        res.json(tournaments);
    })
    .catch(err => {
        res.status(500).json({error: err});
    });
});

// get tournament by id
apiRouter.get('/tournaments/:tournamentId', jwt.middleware, (req, res) => {
    if (!req.valid_jwt) {
        res.status(401).json({"error": "Authentication Failed"});
        return;
    }

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

apiRouter.post('/login', async (req,  res) => {

    // search the database for the user by credentials
    try {
        let user = await UserDAO.getUserByCredentials(req.body.username, req.body.password);
        // Create a JWT for the user
        let payload = {
            "id": user.id,
            "username": user.username,
            "profile_picture": user.profile_picture            
        }

        jwt.generateToken(req, res, payload);
        res.json(payload);

    } catch(err) {
        console.log(err.message);
        res.status(401).json({"error": "Authentication failed"});
    }

});

apiRouter.post('/register', async (req, res) => {
    // console.log(req.body);

    let username = req.body.username;
    let password = req.body.password;
    let profile_picture = req.body.profile_picture;

    let newUser = new User({
        "username": username,
        "profile_picture": profile_picture
    });

    console.log("HASING PASSWORD")
    await newUser.setPasswordHash(password);

    // get the largest user id and check for duplicate username
    UserDAO.getAllUsers().then(users => {
        const duplicateUser = users.find(user => user.username === newUser.username);
        if (duplicateUser) {
            res.status(400).json({"error": "Duplicate User"});
        }

        let newUserId = 0;
        if (users.length > 0) {
            const ids = users.map(user => {
                return user.id;
            });
            const max = Math.max(...ids);
            newUserId = max + 1;
        }
        newUser['id'] = newUserId;
    });

    // create the user in the database
    try {
        UserDAO.createUser(newUser).then(user => {
            // console.log(user);
            res.status(200).json({"user": user});
        });

    } catch(err) {
        res.status(500).json({"error": "Could not register user"});
    }
    

});

apiRouter.post('/logout', (req, res) => {
    jwt.removeToken(req, res);
});

module.exports = apiRouter;