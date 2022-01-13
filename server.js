const express = require('express');
const fs = require('fs');
const path = require('path');
const notes = require('./db/db.json')
const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencided form data
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));


app.get('/notes', (req, res) => {
    console.info('GET /notes');
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// GET request for notes 
app.get('/api/notes', (req, res) => {
    res.status(200).json(notes);
    
    console.info(`${req.method} request received to get notes`);

})

// POST request to add a note
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    const {title, text} = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            }
            else {
                // Parse existing notes string into an array.
                const parsedNotes = JSON.parse(data);
                // Push new note into notes array
                parsedNotes.push(newNote);
                // Rewrite db.json file of notes as a json string.
                fs.writeFile('./db/db.json', JSON.stringify(parsedNotes, null, 4),
                // Callback function
                (writeErr) => writeErr ? console.error(writeErr): console.info('Successfully updated notes!'));
            }
        });

        const response = {
            status: 'success',
            body: newNote
        };

        console.log(response);
        res.status(201).json(response);
    }
    else {
        res.status(500).json('Error in posting note');
    }
});

app.delete('/api/notes/:id', (req, res) => {
    for (i = 0; i < notes.length; i++) {
        if (req.params.id === notes[i].id) {
            notes.splice(i, 1);
        };
    };
});





app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.listen(PORT, () => 
    console.log(`App listening at http:localhost:${PORT}`)
);




