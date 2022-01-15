const router = require('express').Router();
const notes = require('./notes');

// const api = express();

router.use('/notes', notes);

module.exports = router;