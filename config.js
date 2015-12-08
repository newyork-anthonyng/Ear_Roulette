module.exports = {
  secret:   process.env.SECRET,
  database: process.env.MONGOLAB_URI || 'mongodb://localhost/users'
}
