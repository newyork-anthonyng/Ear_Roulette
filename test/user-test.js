'use strict'

process.env.NODE_ENV = 'test';

const chai     = require('chai');
const should   = chai.should();
const chaiHttp = require('chai-http');
const server   = require('../server');
const User     = require('../models/user');
const mongoose = require('mongoose');

chai.use(chaiHttp);

describe('User API', () => {

  it('should create a new user on POST /user/new', (done) => {
    chai.request(server)
      .post('/user/new')
      .send({ name: 'Hercules', password: 'Password' })
      .end((err, res) => {
        res.should.have.a.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.a.property('SUCCESS');
        res.body.SUCCESS.should.be.true;
        res.body.should.have.a.property('MESSAGE');
        res.body.MESSAGE.should.be.eq('User saved successfully');
        res.body.should.have.a.property('name');
        res.body.name.should.be.eq('Hercules');
        res.body.should.have.a.property('password');
        res.body.password.should.be.eq('Password');
        done();
      });
  });

  it('should give error when same user is created on \
    POST /user/new', (done) => {
    chai.request(server)
      .post('/user/new')
      .send({ name: 'Hercules', password: 'Password' })
      .end((err, res) => {
        res.should.have.a.status(401);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.a.property('SUCCESS');
        res.body.SUCCESS.should.be.false;
        res.body.should.have.a.property('MESSAGE');
        res.body.MESSAGE.should.be.eq('User not saved');
        done();
      });
  });

  it('should authenticate valid user on \
    POST /user/authenticate', (done) => {
    chai.request(server)
      .post('/user/authenticate')
      .send({  name: 'Hercules', password: 'Password' })
      .end((err, res) => {
        res.should.have.a.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.a.property('SUCCESS');
        res.body.SUCCESS.should.be.true;
        res.body.should.have.a.property('MESSAGE');
        res.body.MESSAGE.should.be.eq('Enjoy your token.');
        res.body.should.have.a.property('user');
        res.body.should.have.a.property('token');
        done();
      });
  });

  it('should give error when no user is found on \
    POST /user/authenticate', (done) => {
    chai.request(server)
      .post('/user/authenticate')
      .send({ name: 'Zeus', password: 'Password' })
      .end((err, res) => {
        res.should.have.a.status(401);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.a.property('SUCCESS');
        res.body.SUCCESS.should.be.false;
        res.body.should.have.a.property('MESSAGE');
        res.body.MESSAGE.should.be.eq('Authentication failed. User not found.');
        done();
      });
  });

  it('should give error when invalid password on \
    POST /user/authenticate', (done) => {
    chai.request(server)
      .post('/user/authenticate')
      .send({ name: 'Hercules', password: 'WrongPassword' })
      .end((err, res) => {
        res.should.have.a.status(401);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.a.property('SUCCESS');
        res.body.SUCCESS.should.be.false;
        res.body.should.have.a.property('MESSAGE');
        res.body.MESSAGE.should.be.eq('Authentication failed. Wrong password.');
        done();
      });
  });

  User.collection.remove();
});