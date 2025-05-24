const express = require('express')
const adminRoutes = express.Router()

const adminLogin = require('../controllers/adminLogin')
const adminAuth = require('../middleware/adminAuth')
const allEventsGet = require('../controllers/allEventsGet')
const eventStatusChnaged = require('../controllers/eventStatusChanged')

adminRoutes.post('/login', adminAuth, adminLogin)

adminRoutes.get('/allEventsGet',  allEventsGet)

adminRoutes.put('/eventStatusChnaged/:id',  eventStatusChnaged)


module.exports = adminRoutes