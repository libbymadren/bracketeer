const express = require('express');

const app = express();
const apiRouter = require('./APIRoutes');
const PORT = process.env.PORT;

// app.use(express.json());
app.use('/api', apiRouter);

// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));