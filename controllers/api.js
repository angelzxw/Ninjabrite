const express = require('express');
const router = express.Router();
module.exports = router;
const EventModel = require('../models/eventsModel');

router.get('/events', listAllEvents);

function listAllEvents(req, res) {
  let {search} = req.query;
  search = search || "";
  EventModel.getAllEventsWithAttendees(search, (err, events) => {
    res.json({events: events});
  });
}
