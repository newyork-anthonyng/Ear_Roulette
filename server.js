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

const userRoutes = require('./routes/userRoutes');
const spotify    = require('./routes/spotify');

// use Angular
app.use('/scripts', express.static(__dirname + '/node_modules/angular'));

// configuration
mongoose.connect(config.database);
app.set('secret', config.secret);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// set up Routers
app.use('/user', userRoutes);
app.use('/api', spotify);

app.get('/', (req, res) => {
  res.json({ success: true, message: 'get /' });
});

// route middleware to verify token
app.use((req, res, next) => {
  let token = req.headers['x-access-token'];

  if(token) {
    jwt.verify(token, app.get('secret'), (err, decoded) => {

      if(err) {
        return res.json({
            success: false,
            message: 'Failed to authenticate token'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Express server running...');
});

module.exports = app;
