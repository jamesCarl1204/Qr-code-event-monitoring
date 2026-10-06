const express = require('express')
const router = express.Router()
const {event_get, createEvent_post, getEventQr, getRecords, getStudents}= require('../controllers/eventControllers')
 


router.get('/api/events', event_get )
router.get('/api/events/:id/qr', getEventQr)
router.post('/api/create/events', createEvent_post)
router.get('/api/events/:id/records', getRecords)
router.get('/api/students', getStudents)
module.exports = router
