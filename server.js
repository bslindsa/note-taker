const express = require('express');
const path = require('path');
const api = require('./index.js')

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencided form data
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

app.use('/api', api);

app.get('/notes', (req, res) => {
    console.info('GET /notes');
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.listen(PORT, () => 
    console.log(`App listening at http:localhost:${PORT}`)
);




