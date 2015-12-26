'use strict'

const express  = require('express');
const app      = express();
const router   = express.Router();
const User     = require('../models/user');
const mongoose = require('mongoose');
const jwt      = require('jsonwebtoken');
const config   = require('../config');

app.set('secret', config.secret);

// *** API Routes *** //
router.post('/new', saveNewUser);
router.post('/authenticate', authenticateUser);


function saveNewUser(req, res) {
  let name     = req.body.name;
  let password = req.body.password;

  let myUser = new User({
    name:     name,
    password: password
  });

  myUser.save((err) => {
    if(err) {
      res.status(401).send({ SUCCESS: false, MESSAGE: 'User not saved' });
      return;
    } else {
      res.json({
        SUCCESS:  true,
        MESSAGE:  'User saved successfully',
        name:     name,
        password: password
      });
    }
  });
};

function authenticateUser(req, res) {
  User.findOne({
    name: req.body.name
  }, (err, user) => {
    if(err) throw err;

    // user doesn't exist in our database
    if(!user) {
      res.status(401).send({
        success: false,
        message: 'Authentication failed. User not found.'
      });
    } else {
      // check if password matches
      user.comparePassword(req.body.password, (err, isMatch) => {
        if(err) throw err;

        if(isMatch) {
          let token = jwt.sign(user, app.get('secret'), { expiresIn: 3600 });

          res.json({
            user:    user,
            success: true,
            message: 'Enjoy your token.',
            token:   token
          });
        } else {
          res.status(401).send({
            success: false,
            message: 'Authentication failed. Wrong password.'
          });
        }
      });  // end of user.comparePassword()
    }  // end of if(!user)
  });  // end of User.findOne()
};

// route middleware to verify token
// router.use((req, res, next) => {
//   let token = req.headers['x-access-token'];
//
//   if(token) {
//     jwt.verify(token, app.get('secret'), (err, decoded) => {
//
//       if(err) {
//         return res.json({
//             success: false,
//             message: 'Failed to authenticate token'
//         });
//       } else {
//         req.decoded = decoded;
//         next();
//       }
//     });
//   } else {
//     return res.status(403).send({
//       success: false,
//       message: 'No token provided.'
//     });
//   }
// });

module.exports = router;
