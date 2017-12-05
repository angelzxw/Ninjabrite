const {Pool} = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
pool.connect();

const EventModel = {

  getAllEvents(callback) {
    const query = {
      text: 'SELECT * FROM Event',
    };
    pool.query(query, (err, res) => {
      callback(err, err ? [] : res.rows);
    });
  },

  getAllEventsWithAttendees(search, callback) {
    const text = `SELECT e.*, array_to_json(array_agg(a.email)) attendees FROM Event e LEFT JOIN Attendee a
    ON e.id = a.eventId
    where LOWER(e.title) LIKE LOWER(\'%${search}%\') Group BY e.id;`;
    // console.log(text)
    const query = {text: text};
    pool.query(query, (err, res) => {
      callback(err, err ? [] : res.rows);
    });
  },

  getAttendees(eventId, callback) {
    const query = {
      text: 'SELECT Attendee.email FROM Attendee WHERE eventId = $1',
      values: [eventId],
    };
    pool.query(query, (err, res) => {
      callback(err, err ? [] : res.rows);
    });
  },

  getAnEvent(eventId, callback) {
    const text = `SELECT e.*, array_to_json(array_agg(a.email)) attendees FROM Event e
    LEFT JOIN Attendee a ON e.id = a.eventId
    WHERE e.id = '${eventId}' Group BY e.id;`;
    const query = {text: text};
    pool.query(query, (err, res) => {
      err = processError(err, res);
      // console.log('getAnEvent', res);
      callback(err, err ? {} : res.rows[0]);
    });
  },

  createEvent(eventFields, callback) {
    const {title, time, location, image} = eventFields;
    const query = {
      text: 'INSERT INTO Event(title, time, location, image) VALUES ($1, $2, $3, $4) RETURNING id',
      values: [title, time, location, image],
    };
    pool.query(query, (err, res) => {
      // console.log(err, res.rows[0]);
      err = processError(err, res);
      callback(err, err ? {} : res.rows[0]);
    });
  },

  addAttendeeToEvent(eventId, email, callback) {
    const query = {
      text: 'INSERT INTO Attendee(eventId, email) VALUES ($1, $2)',
      values: [eventId, email],
    };
    pool.query(query, (err, res) => {
      err = processError(err, res);
      callback(err, err ? {} : res.rows[0]);
    });
  }
};

function processError(err, res) {
  return err || !res || res.rowCount === 0 ? {err: 'Not Found'} : undefined
}

module.exports = EventModel;
