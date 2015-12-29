var config = {};

config['secret'] = process.env.SECRET || 'password'

config['mongoURI'] = {
  test:        process.env.MONGOLAB_URI || 'mongodb://localhost/users-test',
  development: process.env.MONGOLAB_URI || 'mongodb://localhost/users'
};

module.exports = config;
