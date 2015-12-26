'use strict'

process.env.NODE_ENV = 'test';

const chai     = require('chai');
const should   = chai.should();
const chaiHttp = require('chai-http');
const server   = require('../server');

chai.use(chaiHttp);

describe('Spotify API', () => {

  it('should get artist ID on GET /spotify/artistId', (done) => {
    chai.request(server)
      .get('/spotify/artist?artistName=Killers')
      .end((err, res) => {
        res.should.have.a.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.a.property('SUCCESS');
        res.body.SUCCESS.should.be.true;
        res.body.should.have.a.property('artistId');
        res.body.artistId.should.be.eq('0C0XlULifJtAgn6ZNCW2eu');
        res.body.should.have.a.property('artistName');
        res.body.artistName.should.be.eq('The Killers');
        done();
      });
  });

  it('should return failure when no artist name is provided to GET \
  /spotify/artistId', (done) => {

    chai.request(server)
      .get('/spotify/artist')
      .end((err, res) => {
        res.should.have.a.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.a.property('SUCCESS');
        res.body.SUCCESS.should.be.false;
        res.body.should.have.a.property('MESSAGE');
        res.body.MESSAGE.should.be.eq('Missing artist name');
        done();
      });
  });

  it('should return failure when no artist name is found to GET\
     /spotify/artistId', (done) => {

    chai.request(server)
      .get('/spotify/artist?artistName=jklmnop')
      .end((err, res) => {
        res.should.have.a.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.a.property('SUCCESS');
        res.body.SUCCESS.should.be.false;
        res.body.should.have.a.property('MESSAGE');
        res.body.MESSAGE.should.be.eq('No artist ID found');
        done();
      });
  });

  it('should return albums on GET /spotify/albums', (done) => {
    chai.request(server)
      .get('/spotify/albums?artistId=0C0XlULifJtAgn6ZNCW2eu')
      .end((err, res) => {
        res.should.have.a.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.a.property('SUCCESS');
        res.body.SUCCESS.should.be.true;
        res.body.should.have.a.property('albums');
        res.body.albums.should.be.a('array');
        res.body.albums[0].should.have.a.property('albumId');
        res.body.albums[0].should.have.a.property('albumName');
        res.body.albums[0].should.have.a.property('albumImage');
        done();
      });
  });

  it('should return failure when no artistId is provided to GET\
      /spotify/albums', (done) => {

    chai.request(server)
      .get('/spotify/albums/')
      .end((err, res) => {
        res.should.have.a.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.a.property('SUCCESS');
        res.body.SUCCESS.should.be.false;
        res.body.should.have.a.property('MESSAGE');
        res.body.MESSAGE.should.be.eq('Missing artist ID');
        done();
      });
  });

  it('should get track information on GET /spotify/tracks', (done) => {
    chai.request(server)
      .get('/spotify/tracks?albumId=1m3pbwuYJS9OsXyM2jOSXE')
      .end((err, res) => {
        res.should.have.a.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.a.property('SUCCESS');
        res.body.SUCCESS.should.be.true;
        res.body.should.have.a.property('tracks');
        res.body.tracks.should.be.a('array');
        res.body.tracks[0].should.have.a.property('trackId');
        res.body.tracks[0].trackId.should.be.eq('5zvJ6DUahHHjeknQPn7iAH');
        res.body.tracks[0].should.have.a.property('trackTitle');
        res.body.tracks[0].trackTitle.should.be.eq('Mr. Brightside');
        res.body.tracks[0].should.have.a.property('trackArtist');
        res.body.tracks[0].trackArtist.should.be.eq('The Killers');
        res.body.tracks[0].should.have.a.property('trackPreview');
        res.body.tracks[0].trackPreview.should.be.eq(
            'https://p.scdn.co/mp3-preview/f204bd63c37d3cae41eb49f7287773\
4cd297aedf');
        done();
      });
  });

  it('should get failure when album ID is not provided on GET\
      /spotify/tracks', (done) => {

    chai.request(server)
    .get('/spotify/tracks')
    .end((err, res) => {
      res.should.have.a.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.a.property('SUCCESS');
      res.body.SUCCESS.should.be.false;
      res.body.should.have.a.property('MESSAGE');
      res.body.MESSAGE.should.be.eq('Missing album ID');
      done();
    });
  });
});
