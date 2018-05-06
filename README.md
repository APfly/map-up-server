# Project Name: MapUp - Tech MeetUps in Range

**Author**: Jason Burns, Emery Parks, Jennifer Bach, Noah Israel, and Earl Jay Caoile
**Version**: 1.0.0

## Overview - Problem Domain
To enhance the search experience of the Meetup app by adding an interactive map to provide the user with a visual representation of the location of technology Meetups.  This feature improves the user's serach experience by providing an easy interface to find Meetups based on location.

The following APIs are used to accomplish the goal:

   Google Maps API - provides the interactive map
   Geocode API - to search for locations by address information rather than lattitude or longitude
   MeetUp API - provides a list of events to post on the map


## Getting Started
A user must copy and paste the following Heroku URL: https://apfly-map-up.herokuapp.com/.  The map will default to Seattle Meetups.  The user can enter search criteria including zipcode or city to see Meetups specific to the location.  A URL link to the event page in the MeetUps app and the ability to save events for future reference enhance the user experience.

## Architecture
Languages used: HTML, CSS and Javascript.
Libraries used: jQuery, Highlight HandleBars, Page.js, node.js
APIs used: Google Maps, Geocode, MeetUp

The app is designed with the mobile first midset and in a single-page app style.

The API call to MeetUp is generated everythime the user enters data into the search bar.  The call to MeetUp automatically filters out technology related events within a specified distance of the search location.  The information is then stored and used to pull the pins onto the map.

## Change Log
04-30-2018 9:00am - brainstormed ideas for project
04-30-2018 11:00am - pitched idea
04-30-2018 1:00pm - touched files
04-30-2018 5:00pm - proof of life across remote and local databases (server and client, client and server)

5/1/2018 2:00pm - worked in teams of 2 and 3 to rough in the meetups and maps api separately
5/1/2018 5:00pm - began merging the code together to sync up the integration

## Credits and Collaborations
Code Fellows, John Cokos, TA's Melanie, Noah, Nick

https://developers.google.com/maps/documentation/javascript/adding-a-google-map

https://www.meetup.com/meetup_api/

https://www.youtube.com/watch?v=Zxf1mnP5zcw