const express = require('express');
const validator = require('validator');
const router = express.Router();
module.exports = router;
const EventModel = require('../models/eventsModel');

router.post('/:eventId', addAttendeeToEvent);

function addAttendeeToEvent(req, res) {
  const {eventId} = req.params;
  const email = req.body.email.trim().toLowerCase();
  let errors = [];
  if (!validator.isEmail(email))
    errors.push('Invalid email');
  if(!email.endsWith('@yale.edu'))
    errors.push('Invalid Yale email');
  if(errors.length > 0) {
    const context = {
      title: 'Event Detail',
      error: errors
    };
    res.render('event_detail', context);
  } else {
    EventModel.addAttendeeToEvent(eventId, email, (err, ret) => {
      if (err) {
        const context = {
          title: 'Create an Event',
          errors: ['Server Error']
        };
        res.render('new_event', context);
        return;
      }
      res.redirect('/events/' + eventId);
    });
  }
}
