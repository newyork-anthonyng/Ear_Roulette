module.exports = {
  secret:   "password",
  database: process.env.MONGOLAB_URI || 'mongodb://localhost/users'
}
