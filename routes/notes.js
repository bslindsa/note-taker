const router = require('express').Router();
const fs = require('fs');
const database = require('../db/db.json')
const uuid = require('../helpers/uuid');

// const notes = express();

// GET request for notes 
router.get('/', (req, res) => {
    res.json(database);
    console.info(`${req.method} request received to get notes`);
    fs.readFile('./db/db.json', 'utf8', (err) => {
        console.error(err);
    });
});

// POST request to add a note
router.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    const {title, text} = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };
        database.push(newNote);
        res.send(database);
    }
    else {
        res.error('Error in adding note')
    } 
});
    
// Delete request to delete a note
router.delete('/:id', (req, res) => {
    console.info(`${req.method} request received to delete a note`);

    for (let i = 0; i < database.length; i++) {
        if (database[i].id === req.params.id) {
            database.splice(i, 1);
        };
    };
    fs.writeFileSync('./db/db.json', JSON.stringify(database, null, 4));
    res.json(database);
});

module.exports = router;