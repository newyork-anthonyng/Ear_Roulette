'use strict'
const express     = require('express');
const app         = express();
const logger      = require('morgan');
const request     = require('request');

app.use(logger('dev'));
app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.json({ SUCCESS: true });
});

app.get('/get_songs', (req, res) => {
	res.json({ foo: 'bar' });
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on ' + server.address().port);
});

module.exports = app;
