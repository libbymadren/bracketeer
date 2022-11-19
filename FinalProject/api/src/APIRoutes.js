const express = require('express');
const UserDAO = require('./data/UserDAO');
const MatchDAO = require('./data/MatchDAO');
const User = require('./data/models/User');
const jwt = require('./utils/jwt')
const TournamentDAO = require('./data/TournamentDAO');
const crypto = require('node:crypto')
// let users = require(data_path + 'users.json');
// let tournaments = require(data_path + 'tournaments.json');
// let matches = require(data_path + 'matches.json');

const apiRouter = express.Router();
const data_path = __dirname + '/data/';


const cookieParser = require('cookie-parser');
apiRouter.use(cookieParser());


apiRouter.use(express.json({limit: '50mb'}));

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
apiRouter.get('/users/byId/:userId', jwt.middleware, (req,  res) => {
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
    MatchDAO.getMatchesByUser(userId).then(match => {
        res.json(match);
    }).catch(err => {
        res.status(400).json({error: err});
    });
});

// Get all tournaments for a specific user
apiRouter.get('/users/:userId/tournaments/entered', jwt.middleware, (req,  res) => {
    if (!req.valid_jwt) {
        res.status(401).json({"error": "Authentication Failed"});
        return;
    }

    const userId = req.params.userId;
    TournamentDAO.getEnteredTournamentsByUser(userId).then(tournaments => {
        console.log(tournaments);
        res.json(tournaments);
    }) 
    .catch(err => {
        res.status(500).json({error: err});
    });
});

// Get all tournaments for a specific user
apiRouter.get('/users/:userId/tournaments/created', jwt.middleware, (req,  res) => {
    if (!req.valid_jwt) {
        res.status(401).json({"error": "Authentication Failed"});
        return;
    }

    const userId = req.params.userId;
    TournamentDAO.getCreatedTournamentsByUser(userId).then(tournaments => {
        console.log(tournaments);
        res.json(tournaments);
    }) 
    .catch(err => {
        res.status(500).json({error: err});
    });
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
    console.log(req.valid_jwt);
    if (!req.valid_jwt) {
        res.status(401).json({"error": "Authentication Failed"});
        return;
    }

    UserDAO.getUserById(req.jwt_payload.id).then(user => {
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


// ----------------------------------------------------
// TOURNAMENTS API
// ----------------------------------------------------

// Get all tournaments
apiRouter.get('/tournaments', jwt.middleware, (req,  res) => {
    if (!req.valid_jwt) {
        res.status(401).json({"error": "Authentication Failed"});
        return;
    }

    TournamentDAO.getAllTournaments().then(tournament => {
        res.json(tournament);
      })
      .catch(err => {
        res.status(400).json({error: err});
      });
});

// Create a tournament
apiRouter.post('/tournaments', jwt.middleware, (req, res) => {
    if (!req.valid_jwt) {
        res.status(401).json({"error": "Authentication Failed"});
        return;
    }

    // generate a join id
    let joinId = crypto.createHash('SHAKE256',{outputLength: 10}).update(JSON.stringify(req.body)).digest("hex");

    // add join id to incoming 
    let tournamentInfo = req.body;
    tournamentInfo["join_id"] = joinId;
    tournamentInfo.picture = Buffer.from(tournamentInfo.picture, 'base64')

    TournamentDAO.createTournament(tournamentInfo).then(tournament => {
        res.status(200).json(tournament);
    });
 });

// Update a specific tournament
apiRouter.put('/tournaments/:tournamentId', jwt.middleware, (req, res) => {
    if (!req.valid_jwt) {
        res.status(401).json({"error": "Authentication Failed"});
        return;
    }


    const tournamentId = req.params.tournamentId;
    let newTournament = req.body;
    newTournament = TournamentDAO.updateTournament(newTournament, tournamentId).then(tournament => {
        res.json(tournament);
    });
});

// delete a tournament
apiRouter.delete('/tournaments/:tournamentId', jwt.middleware, (req, res) => {
    if (!req.valid_jwt) {
        res.status(401).json({"error": "Authentication Failed"});
        return;
    }


    const tournamentId = req.params.tournamentId;
    TournamentDAO.getUserById(tournamentId).then(tournament => {
        res.json(tournament);
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

// Not sure if we need this? I think matches would only be generated on the backend
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

apiRouter.get('/tournaments/join/:joinId', jwt.middleware, (req, res) => {
    if (!req.valid_jwt) {
        res.status(401).json({"error": "Authentication Failed"});
        return;
    }

    let targetTournamentJoinId = req.params.joinId;

    TournamentDAO.getTournamentByJoinId(targetTournamentJoinId).then(tournament => {
        if(tournament) {
            res.json(tournament);
        }
        else {
            res.status(404).json({error: 'Tournament not found'});
        }
    }).catch(err => {
        res.status(500).json({error: err});
    });
});

apiRouter.get('/tournaments/:tournamentId/participants', jwt.middleware, (req, res) => {
    if (!req.valid_jwt) {
        res.status(401).json({"error": "Authentication Failed"});
        return;
    }

    let targetTournamentId = req.params.tournamentId;

    TournamentDAO.getTournamentParticipants(targetTournamentId).then(pariticpants => {
        if(pariticpants) {
            res.json(pariticpants);
        }
        else {
            res.status(404).json({error: 'Participants not found'});
        }
    }).catch(err => {
        res.status(500).json({error: err});
    });
});

// ----------------------------------------------------
// JOIN API
// ----------------------------------------------------

apiRouter.put('/tournaments/join/:joinId', jwt.middleware, async (req, res) => {
    if (!req.valid_jwt) {
        res.status(401).json({"error": "Authentication Failed"});
        return;
    }

    console.log(req.params.joinId);
    let targetTournament = await TournamentDAO.getTournamentByJoinId(req.params.joinId)
    // console.log(targetTournament);

    let tournamentId = targetTournament.id;
    let userId = req.jwt_payload.id;

    // console.log(tournamentId, userId);

    // let participants = await TournamentDAO.getTournamentParticipants(tournamentId);

    // console.log("LOOK AT ME!");
    // console.log(participants);

    // if (participants.indexOf(userId) !== -1) {
    //     console.log("User is already entered into this tournament");
    //     res.status(401).json({"error": "User is already entered into this tournament"});
    //     return;
    // }

    TournamentDAO.addUserToTournament(tournamentId, userId).then(addition => {
        if(addition) {
            res.json(addition);
        }
        else {
            res.status(500).json({error: 'Error'});
        }
    }).catch(err => {
        res.status(500).json({error: err});
    });
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
        console.log(req.body.username, req.body.password);
        let user = await UserDAO.getUserByCredentials(req.body.username, req.body.password);
        // Create a JWT for the user
        let payload = {
            "id": user.id,
            "username": user.username           
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
    let profile_picture = Buffer.from(req.body.profile_picture, "base64");

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
    res.status(200).json({"message": "user logged out"});
    return;
});

module.exports = apiRouter;