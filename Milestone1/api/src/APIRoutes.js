const express = require('express');
const apiRouter = express.Router();

let users = require('./data/users.json');
let tournaments = require('./data/tournaments.json');

apiRouter.use(express.json());

apiRouter.get('/', (req,  res) => {
    res.json({your_api: 'it works'});
});

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

// Get all tournaments
apiRouter.get('/tournaments', (req,  res) => {
    res.json(tournaments);
});

// Get specific tournament
apiRouter.get('/tournaments/:tournamentId', (req,  res) => {
    const tournamentId = req.params.tournamentId;
    let tournament = tournaments.find(tournament => tournament.id == tournamentId);

    if(tournament) {
        res.json(tournament);
    }
    else {
        res.status(404).json({error: 'Tournament not found'});
    }
});

// Update a specific tournament
router.put('/tournaments/:tournamentId', (req, res) => {

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
            // Tournament not found, create new
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

module.exports = apiRouter;