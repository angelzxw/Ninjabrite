const express = require('express');
const router = express.Router();

router.get('/', nickname);

// Create a function which is a "controller", it
// handles a req, writing the res.
function nickname(req, res) {
    res.send('healthy-gazelle');
}

module.exports = router;
