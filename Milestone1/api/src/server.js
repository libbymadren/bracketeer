const express = require('express');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get('/', (req,  res) => {
  res.json({your_api: 'it works'});
});


// Get all users
app.get('/users', (req,  res) => {
    res.json(users);
});

// Get specific user
app.get('/users/:userId', (req,  res) => {
    const userId = req.params.userId;
    let user = users.find(user => user.id == userId);

    if(user) {
        res.json(user);
    }
    else {
        res.status(404).json({error: 'User not found'});
    }
});


// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));