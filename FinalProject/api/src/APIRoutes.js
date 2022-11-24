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
            console.log(tournament);
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

    TournamentDAO.getTournamentMatches(targetTournamentId).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json({"Error":"Error getting matches"});
    })
});

// Generate matches for a tournament
apiRouter.post('/tournaments/:tournamentId/matches', jwt.middleware, (req, res) => {
    if (!req.valid_jwt) {
        res.status(401).json({"error": "Authentication Failed"});
        return;
    }

    // get the tournament
    TournamentDAO.getTournamentById(req.params.tournamentId).then(tournament => {
        if(tournament) {

            // check to make sure that the user is the owner
            if (tournament.organizer_id != req.jwt_payload.id) {
                res.status(401).json({"error": "Not authorized to modify this tournament"});
                return;
            }

            // get the participants for the tournament
            TournamentDAO.getTournamentParticipants(tournament.id).then(participants => {
                if(participants) {

                    function processingQueueString(queue) {
                        
                        let processingString = "[";
                        for (let node of processingQueue) {
                            if (typeof(node) != 'undefined') {
                                processingString += " " + node.number + " ";
                            } else {
                                processingString += " undefined ";
                            }
                        }
                        processingString += "]";
                        
                        return processingString;
                    }

                    function printTree(rootNode) {
                        
                        let printQueue = [];
                        printQueue.unshift(rootNode);
                        
                        while (printQueue.length > 0) {
                            // print everything in queue
                            let printString ="";
                            for (let node of printQueue) {
                                printString += " " + node.number;
                            }
                            printString += " ";
                            console.log(printString);
                            
                        
                            // add children
                            let nodesInQueue = printQueue.length;
                            for (let i = 0; i < nodesInQueue; i++) {
                                let node = printQueue.pop();
                                for (let child of node.children) {
                                    printQueue.unshift(child);
                                }
                            }
                        }
                        
                    }

                    // have participants
                    // have tournament

                    // number of matches will be one less than the number of participants
                    // due to the fact that every match will eliminate one participant until
                    // one is left
                    let numMatches = participants.length - 1;

                    console.log("Number of matches: " + numMatches);


                    let rootNode = {
                        "children": [],
                        "tournament_id": tournament.id,
                        "participant_one_id": null,
                        "participant_two_id": null,
                        "winner_id": null,
                        "next_match_number": null,
                        "number": numMatches,
                        "round": null
                    }

                    let processingQueue = []

                    console.log("Add root node");
                    processingQueue.unshift(rootNode);

                    console.log("");

                    // create matches in a tree like structure
                    // order of generation goes like:
                    // generate root node
                    // generate first child
                    // generate second child
                    // generate one child for each root child
                    // generate the second child for each root child
                    // repeat until match number has been met
                    let roundNumber = 1;
                    for (let matchesGenerated = 1; matchesGenerated < numMatches;)  {
                        
                        // generate first childs
                        let matchesToProcess = processingQueue.length;
                        for (let j = 0; j < matchesToProcess && matchesGenerated < numMatches; j++) {
                            matchesGenerated++;
                            let parent = processingQueue.pop();
                            console.log("Add first child to node " + parent.number);
                            
                            parent.round = roundNumber;

                            // add first child
                            let child = {
                                "children": [],
                                "tournament_id": tournament.id,
                                "participant_one_id": null,
                                "participant_two_id": null,
                                "winner_id": null,
                                "next_match_number": parent.number,
                                "number": numMatches - matchesGenerated + 1,
                                "round": roundNumber + 1,
                            }
                            parent.children[0] = child;

                            // add the parent back to the processing queue 
                            // so that the second child can be added
                            processingQueue.unshift(parent);

                            
                        }

                        // generate second 
                        matchesToProcess = processingQueue.length;
                        for (let j = 0; j < matchesToProcess && matchesGenerated < numMatches; j++) {
                            
                            matchesGenerated++;
                            
                            let parent = processingQueue.pop();
                            console.log("Add second child to node " + parent.number);

                            // add first child
                            let child = {
                                "children": [],
                                "tournament_id": tournament.id,
                                "participant_one_id": null,
                                "participant_two_id": null,
                                "winner_id": null,
                                "next_match_number": parent.number,
                                "number": numMatches - matchesGenerated + 1,
                                "round": roundNumber + 1,
                            }
                            parent.children[1] = child;

                            // add the children to the processing queue
                            console.log("Adding node " + parent.number + "'s two children: [" + parent.children[0].number + ", " + parent.children[1].number + "] children to processing queue");
                            processingQueue.unshift(parent.children[0]);
                            processingQueue.unshift(parent.children[1]);

                            
                        }
                        
                        console.log("Matches made after iteration: " + matchesGenerated);
                        console.log("Processing queue after iteration: " + processingQueueString(processingQueue));
                        console.log("");
                        
                        roundNumber++;
                    }

                    console.log("Total rounds: " + (roundNumber-1));

                    printTree(rootNode);


                    processingQueue = [];
                    let matches = []
                    processingQueue.unshift(rootNode);
                    while (processingQueue.length > 0) {
                        // add everything in queue
                        for (let node of processingQueue) {
                            // adjust round number and add to array
                            node.round = Math.abs(node.round - roundNumber)
                            matches.push(node);
                        }

                        // add children
                        let nodesInQueue = processingQueue.length;
                        for (let i = 0; i < nodesInQueue; i++) {
                            let node = processingQueue.pop();
                            for (let child of node.children) {
                                processingQueue.unshift(child);
                            }
                        }
                    }
                    

                    console.log("Adding participants");

                    // add participants to matches
                    let participantsAdded = 0;
                    for (let match of matches) {
                        if (match.children.length == 0) {
                            // all root nodes will have two participants
                            match.participant_one_id = participants.splice(Math.floor(Math.random()*participants.length), 1)[0].id;
                            match.participant_two_id = participants.splice(Math.floor(Math.random()*participants.length), 1)[0].id;
                            console.log("Root node participants added");
                            participantsAdded += 2;
                        } else if (match.children.length == 1) {
                            // all parents to a singular root node will have one participant
                            match.participant_one_id = participants.splice(Math.floor(Math.random()*participants.length), 1)[0].id;
                            console.log("Parent to singular root node participants added");
                            participantsAdded++;
                        }
                    }
                    console.log("Participants added: " + participantsAdded)

                    try {
                        MatchDAO.bulkInsertMatches(matches);
                        TournamentDAO.markMatchesGenerated(tournament.id);
                    } catch {
                        console.log("ERROR: Error saving match generation");
                    }

                    res.status(200).json({"Message": "Matches generated"});
                    
                }
                else {
                    res.status(404).json({error: 'Participants not found'});
                }
            }).catch(err => {
                console.log(err);
                res.status(500).json({error: err});
            });


        }
        else {
            res.status(404).json({error: 'Tournament not found'});
        }
    }).catch(err => {
        res.status(500).json({error: err});
    });

    // generate the matches for the tournament






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

    console.log(tournamentId, userId);

    let participants = await TournamentDAO.getTournamentParticipants(tournamentId);

    for (let i = 0; i < participants.length; i++) {
        if (participants[i].id == userId) {
            console.log("User is already entered into this tournament");

            let tournament = await TournamentDAO.getTournamentById(tournamentId);
            let user = await UserDAO.getUserById(userId);

            console.log(tournament);
            console.log(user);

            // res.status(401).json({"error": "User is already entered into this tournament"});
            res.json({tournament: tournament, user: user});
            return;
        }
    }

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

apiRouter.get('/matches/:matchId', jwt.middleware, (req, res) => {
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

apiRouter.put('/matches', jwt.middleware, (req, res) => {
    if (!req.valid_jwt) {
        res.status(401).json({"error": "Authentication failed"});
        return;
    }

    let match = req.body;
    console.log(match);

    MatchDAO.updateMatch(match).then(match => {
        console.log("Successful update");
        res.status(200).json({"Message": "Match updated"});
    }).catch(err => {
        console.log(err);
        res.status(400).json({"Error": "Error updating match"});
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