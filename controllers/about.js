const express = require('express');
const router = express.Router();

router.get('/', about);

function about(req, res) {
    res.render('about', { title: 'About Eventbrite' });
}

module.exports = router;
