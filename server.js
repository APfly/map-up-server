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

app.get('/meetup/init_search', (req, res) => {
  console.log('routing default local request to Meetup');
  const url = `https://api.meetup.com/find/upcoming_events?&key=${MEETUP_API_KEY}&sign=true&text=tech&photo-host=public&page=20&radius=30`;
  superagent.get(url)
    .then(meetups => {
      console.log('loading stuff from meetups api');
      res.send(meetups)
    })
    .catch(error => console.log('error', error.message));
});

app.get('/meetup/new_search/:latlng', (req, res) => {
  console.log('request params:', req.params);
  let latlng = req.params['latlng'].split(' ');
  console.log(latlng);
  let newLat = latlng[0];
  let newLng = latlng[1];
  console.log('routing a new request to Meetup');
  // const url = `https://api.github.com/${req.params[0]}`;
  const url = `https://api.meetup.com/find/upcoming_events?&key=${MEETUP_API_KEY}&sign=true&text=tech&photo-host=public&page=20&radius=30&lon=${newLng}&lat=${newLat}`;
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

app.post('/meetup/new_search', (request, response) => {
  console.log('meetuppost');
  client.query(
    `INSERT INTO
     venue(venue_name, address_1, address_2, city, state, zip, lat, lon)
     VALUES($1, $2, $3, $4, $5, $6, $7, $8);
    `,
    [request.venue.name,
    request.venue.address_1,
    request.venue.address_2,
    request.venue.city,
    request.venue.state,
    request.venue.zip,
    request.venue.lat,
    request.venue.lon
    ],
    function (err) {
      if (err) console.error(err);
      queryTwo();
    }
  )

    function queryTwo() {
      client.query(
        `SELECT venue_id FROM venue
        WHERE author = $1;`,
        [
          request.name
        ],
    function (err, result) {
          if (err) console.error(err);
          console.log(result);
          console.log(result.rows);       
          queryThree(result.rows[0].venue_id);
        }
      )
    }

   function queryThree(venue_id) {
    client.query(
     `INSERT INTO 
      event(event_name, group_name, date, time, url, venue_id)
             
      VALUES ($1, $2, $3, $4, $5, $6);`,
       [request.name,
        request.group.name,
        request.local_date,
        request.local_time,
        request.link,
        venue_id
        ],
            function (err) {
              if (err) console.error(err);
              response.send('insert complete');
            }
          );
        }
      });



