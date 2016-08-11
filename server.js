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
				title: 'My Shot',
				artist: 'Original Broadway Cast of Hamilton',
				image: 'https://i.scdn.co/image/cab99e12568f975eacaf11dac9493d7c07e51e4e',
				preview: 'https://p.scdn.co/mp3-preview/4d80119d75592741b76faf04fe294b2e02cb88ee'
			},
			{
				title: 'My Shot',
				artist: 'Original Broadway Cast of Hamilton',
				image: 'https://i.scdn.co/image/cab99e12568f975eacaf11dac9493d7c07e51e4e',
				preview: 'https://p.scdn.co/mp3-preview/4d80119d75592741b76faf04fe294b2e02cb88ee'
			},
			{
				title: 'My Shot',
				artist: 'Original Broadway Cast of Hamilton',
				image: 'https://i.scdn.co/image/cab99e12568f975eacaf11dac9493d7c07e51e4e',
				preview: 'https://p.scdn.co/mp3-preview/4d80119d75592741b76faf04fe294b2e02cb88ee'
			},
			{
				title: 'My Shot',
				artist: 'Original Broadway Cast of Hamilton',
				image: 'https://i.scdn.co/image/cab99e12568f975eacaf11dac9493d7c07e51e4e',
				preview: 'https://p.scdn.co/mp3-preview/4d80119d75592741b76faf04fe294b2e02cb88ee'
			}
		]
	});
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on ' + server.address().port);
});

module.exports = app;
