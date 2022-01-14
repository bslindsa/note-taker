const express = require('express');
const notes = require('./routes/notes');


const api = express();

api.use('/notes', notes);

module.exports = api;