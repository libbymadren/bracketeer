const express = require('express');

const app = express();
const apiRouter = require('./APIRoutes');
const PORT = process.env.PORT;



// app.use('', apiRouter);

app.use(express.json());
app.get('/', (req,  res) => {
    res.json({your_api: 'it works'});
});


app.get('/test', (req,  res) => {
    res.json({your_api: 'it works test'});
});

// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));