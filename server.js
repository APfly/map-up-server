'use strict';

const express = require('express');
const cors = require('cors');
const pg = require('pg');
const superagent = require('superagent');

//token: ac725033530724b6e295ef5d4352;

const app = express();
const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;
// const TOKEN = process.env.TOKEN;

app.use(express.static('./public'));
app.use(cors());

const MEETUP_API_KEY = process.env.MEETUP_API_KEY;

// Database Setup
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

app.get('/meetup/new_search/:latlng', (req, res) => {
  console.log('request params:', req.params);
  let latlng = req.params['latlng'].split(' ');
  console.log(latlng);
  let newLat = latlng[0];
  let newLng = latlng[1];
  console.log('routing a new request to Meetup');
  const url = `https://api.meetup.com/find/upcoming_events?&key=${MEETUP_API_KEY}&sign=true&text=tech&photo-host=public&page=20&radius=30&lon=${newLng}&lat=${newLat}`;
  superagent.get(url)
    .then(meetups => {
      console.log('loading stuff from meetups api');
      res.send(meetups)
    })
    .catch(error => console.log('error', error.message));
});

app.get('/', (req, res) => {
  res.sendFile('index.html')
});

app.get('*', (req, res) => res.redirect(CLIENT_URL));
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));