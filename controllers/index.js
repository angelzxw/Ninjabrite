const express = require('express');
const router = express.Router();
const EventModel = require('../models/eventsModel');

router.get('/', index);

function index(req, res) {
  EventModel.getAllEvents((err, events) => {
    const context = {
      title: 'List of Events',
      events: events,
    };
    res.render('index', context);
  });
}

module.exports = router;
