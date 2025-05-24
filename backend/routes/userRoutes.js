const express = require('express')
const eventAuth = require('../middleware/eventAuth')
const eventAdd = require('../controllers/eventAdd')
const userEvents = require('../controllers/userEvents')
const userRoutes = express.Router()

userRoutes.post('/eventAdd', eventAuth, eventAdd)

userRoutes.get('/profile/:user', userEvents)



module.exports = userRoutes