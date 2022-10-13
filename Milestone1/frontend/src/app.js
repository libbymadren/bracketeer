const express = require('express');

const app = express();
const PORT = process.env.PORT;
const html_path = __dirname + '/static/templates';

// Designate the static folder as serving static resources
app.use(express.static(__dirname + '/static'));

app.get('/home', (req, res) => {
    res.sendFile(html_path + '/home.html');
});


// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));