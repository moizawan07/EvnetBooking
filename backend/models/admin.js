const mongoose = require('mongoose')

const schema = mongoose.Schema({
  name: String,
  email: String,
  password : String,
  date: { type: Date, default: Date.now},
})

const adminModel = mongoose.model('admin', schema)

module.exports = adminModel