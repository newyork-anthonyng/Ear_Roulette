'use strict'

const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const logger      = require('morgan');
const request     = require('request');
const mongoose    = require('mongoose');

const jwt         = require('jsonwebtoken');
const config      = require('./config');
const User        = require('./models/user');

const userRoutes    = require('./routes/user');
const spotifyRoutes = require('./routes/spotify');

// configuration
app.set('secret', config.secret);

mongoose.connect(config.mongoURI[app.settings.env], (err, res) => {
  if(err) {
    console.log('Error connecting to database. ' + err);
  } else {
    console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
  }
});


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// set up Routers
app.use('/user', userRoutes);
app.use('/spotify', spotifyRoutes);

app.get('/', (req, res) => {
  res.json({ SUCCESS: true });
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Express server running...');
});

module.exports = app;
