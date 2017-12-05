'use strict';
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', require('./controllers/index.js'));
app.use('/api', require('./controllers/api.js'));
app.use('/events', require('./controllers/events.js'));
app.use('/rsvp', require('./controllers/rsvp.js'));
app.use('/about', require('./controllers/about.js'));
app.use('/progress', require('./controllers/progress.js'));
app.use('/donate', require('./controllers/donate.js'));
// app.use('/nickname', require('./controllers/nickname.js'));

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Server listening at port", port);
});
