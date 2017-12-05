const express = require('express');
const router = express.Router();

router.get('/', donate);
function donate(req, res) {
    res.render('donate', { title: 'Thank You' });
}
module.exports = router;
