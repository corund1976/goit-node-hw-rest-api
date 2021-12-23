const mongoose = require('mongoose')

mongoose.Promise = global.Promise

require('dotenv').config()

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`

mongoose.connect(uri)
  .then(() =>
    console.log('Database connection successful'))
  .catch(error => {
    console.log(error.message)
    process.exit(1)
  })

module.exports = mongoose
