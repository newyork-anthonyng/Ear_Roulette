var config = {};

config['secret'] = "password"

config['mongoURI'] = {
  test:        'mongodb://localhost/users-test',
  // development: process.env.MONGOLAB_URI || 'mongodb://localhost/users'
  development: 'mongodb://localhost/users'
};

module.exports = config;
