const express = require('express');

const app = express();
const PORT = process.env.PORT;
const html_path = __dirname + '/static/';

// Designate the static folder as serving static resources
app.use(express.static(__dirname + '/static'));


app.get('/create', (req, res) => {
    res.sendFile(html_path + '/create.html');
});
  
app.get('/edit', (req, res) => {
    res.sendFile(html_path + '/edit.html');
});


// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));