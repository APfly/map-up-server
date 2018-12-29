'use strict';

// Application dependencies
const express = require('express');
const cors = require('cors');
const pg = require('pg');
const superagent = require('superagent');

// Application Setup
const app = express();
const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;
const MEETUP_API_KEY = process.env.MEETUP_API_KEY;

// Database Setup
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

// Application Middleware
app.use(cors());

// API Endpoints
app.get('/meetup/new_search/:latlng', (req, res) => {
  console.log('request params:', req.params);
  let latlng = req.params['latlng'].split(' ');
  console.log(latlng);
  let newLat = latlng[0];
  let newLng = latlng[1];
  console.log('routing a new request to Meetup');
    // Original, Emery changed 20181228 const url = `https://api.meetup.com/find/upcoming_events?&key=${MEETUP_API_KEY}&sign=true&text=tech%2C+JavaScript%2C+Java%2C+Python%2C%2C+coding&photo-host=public&page=20&radius=30&lon=${newLng}&lat=${newLat}`;
  const url = `https://api.meetup.com/find/upcoming_events?&key=${MEETUP_API_KEY}&sign=true&text=tech%2C&photo-host=public&page=20&radius=30&lon=${newLng}&lat=${newLat}`;
  superagent.get(url)
    .then(meetups => {
      console.log('loading stuff from meetups api');
      res.send(meetups)
    })
    .catch(error => console.log('error', error.message));
});

app.get('*', (req, res) => res.redirect(CLIENT_URL));
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
