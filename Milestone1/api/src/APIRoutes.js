const express = require('express');
const apiRouter = express.Router();

let users = require('./data/users.json');

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

module.exports = apiRouter;