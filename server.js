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
	res.json({
		songs: [
			{
				title: 'My Shot',
				artist: 'Original Broadway Cast of Hamilton',
				image: 'https://i.scdn.co/image/cab99e12568f975eacaf11dac9493d7c07e51e4e',
				preview: 'https://p.scdn.co/mp3-preview/4d80119d75592741b76faf04fe294b2e02cb88ee'
			},
			{
				title: 'Dancing Queen',
				artist: 'Abba',
				image: 'https://i.scdn.co/image/6acb2f6b68a0fa577d9afed7547a2e6d9a48e08a',
				preview: 'https://p.scdn.co/mp3-preview/07dbfe8eb7729d99a182b26fa1ec2f3467ba86f5'
			},
			{
				title: 'Guns and Ships',
				artist: 'Original Broadway Cast of Hamilton',
				image: 'https://i.scdn.co/image/cab99e12568f975eacaf11dac9493d7c07e51e4e',
				preview: 'https://p.scdn.co/mp3-preview/06062a76220ae6d7df233663fe24d49d45d6dee0'
			},
		]
	});
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on ' + server.address().port);
});

module.exports = app;
