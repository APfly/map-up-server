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

// app.get('/', (req, res) => res.send());
// app.get('/', (req, res) => {
//   client.query('SELECT * FROM meetups')
//     .then(results => res.send(results.rows));
//   // .catch(console.error);
// });

app.get('/meetup/*', (req, res) => {
  console.log('routing a request to Meetup');
  // const url = `https://api.github.com/${req.params[0]}`;
  const url = 'https://api.meetup.com/find/upcoming_events?photo-host=public&page=10&text=tech&sig_id=179434442&lon=-122.2015159&lat=47.6101497&radius=5&only=events&sig=5f5aaff23adebc9d4443c7a35527d839c61ace16';
  superagent.get(url)
    // .set('Authorization', process.env.GITHUB_TOKEN)
    .then(meetups => {
      console.log('loading stuff from meetups api');
      res.send(meetups)
    })
    .catch(error => console.log('error', error.message));
});

// app.get('/meetup/upcoming_events', (req, res) => {
//   client.query(`SELECT * from meetups;`)
//     .then(results => res.send(results.rows))
//     .catch(console.error);
// });
app.get('/', (req, res) => {
  res.sendFile('index.html')
});

app.get('*', (req, res) => res.redirect(CLIENT_URL));
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));