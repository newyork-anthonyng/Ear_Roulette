'use strict'

const express  = require('express');
const router   = express();
const User     = require('../models/user');
const mongoose = require('mongoose');

router.get('/', (req, res) => {
  res.json({ success: true, message: 'get user/' });
});

router.post('/authenticate', (req, res) => {
  User.findOne({
    name: req.body.name
  }, (err, user) => {
    if(err) throw err;

    if(!user) {
      res.json({
        success: false,
        message: 'Authentication failed. User not found.'
      });
    } else {

      if(user.password != req.body.password) {
        res.json({
          success: false,
          message: 'Authentication failed. Wrong password.'
        });
      } else {
        // user is authenticated
        let token = jwt.sign(user, app.get('secret'), { expiresIn: 3600 });

        // return the token information
        console.log('token: ' + token);
        res.json({
          success: true,
          message: 'Enjoy your token.',
          token:   token
        });
      }
    }
  });
});

// route middleware to verify token
router.use((req, res, next) => {
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

// test route to show all users
router.get('/all', (req, res) => {
  User.find({}, (err, users) => {
    if(err) throw err;

    res.json({ success: true, users: users });
  });
});

module.exports = router;
