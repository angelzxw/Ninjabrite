const express = require('express');
const validator = require('validator');
const router = express.Router();
module.exports = router;
const EventModel = require('../models/eventsModel');

router.get('/', listAllEvents);
router.get('/new', newEventPage);
router.get('/:id', showAnEvent);
router.post('/new', createEvent);

function listAllEvents(req, res) {
  EventModel.getAllEvents((err, events) => {
    const context = {
      title: 'List of Events',
      events: events,
    };
    res.render('events', context);
  });
}

function showAnEvent(req, res) {
  const eventId = req.params.id;
  EventModel.getAnEvent(eventId, (err, event) => {
    if(err) {
      res.redirect('/events');
      return;
    }
    console.log(event);
    const context = {
      title: 'Show an Events',
      event: event,
    };
    res.render('event_detail', context);
  });
}

function newEventPage(req, res) {
  const context = {
    title: 'Create an Event',
  };
  res.render('new_event', context);
}

function createEvent(req, res) {
  let {title, time, location, image, year, month, day, hour, minute} = req.body;
  let errors = [];
  if (!validator.isLength(title, { min: 1, max: 50 }))
    errors.push('Invalid title');
  if (!validator.isLength(location, { min: 1, max: 50 }))
    errors.push('Invalid Location');
  if (!validator.isURL(image, { require_protocol: true }) || (!image.endsWith('.jpg') && !image.endsWith('.png') && !image.endsWith('.gif')))
    errors.push('Invalid image');
  if(errors.length > 0) {
    const context = {
      title: 'Create an Event',
      errors: errors
    };
    res.render('new_event', context);
  } else {
    EventModel.createEvent(req.body, (err, ret) => {
      if (err) {
        const context = {
          title: 'Create an Event',
          errors: ['Server Error']
        };
        res.render('new_event', context);
        return;
      }
      console.log('createEvent', ret);
      res.redirect('/events/' + ret.id);
    });
  }
}
