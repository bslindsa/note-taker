const express = require('express')
const fs = require('fs');
const database = require('../db/db.json')
const uuid = require('../helpers/uuid');
const { readAndAppend } = require('../helpers/fsUtils');

const notes = express();

notes.use(express.json());
notes.use(express.urlencoded({extended: true}));



// GET request for notes 
notes.get('/', (req, res) => {
    res.json(database);
    console.info(`${req.method} request received to get notes`);
    fs.readFile('./db/db.json', 'utf8', (err) => {
        console.error(err);
    });
})

// POST request to add a note
notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    const {title, text} = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json('Note added successfully')
    }
    else {
        res.error('Error in adding note')
    }
});
    

notes.delete('/:id', (req, res) => {
    for (let i = 0; i < database.length; i++) {
        if (database[i].id === req.params.id) {
            database.splice(i, 1);
        };
    };
    fs.writeFileSync('./db/db.json', JSON.stringify(database, null, 4));
    res.json(database);
});

module.exports = notes;