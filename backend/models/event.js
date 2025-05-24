const mongoose = require('mongoose')

const schema = mongoose.Schema({
  name: String,
  email: String,
  description: String,
  status: {
    type: String, 
    enum : ['Pending', 'Accept', 'Reject'],
    default : 'Pending'
},
  date: { type: Date, default: Date.now},
  time : {type: String}
})

const eventModel = mongoose.model('event', schema)

module.exports = eventModel