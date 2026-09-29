const express = require('express')
const router = express.Router()
const {event_get, createEvent_post, getEventQr} = require('../controllers/eventControllers')
 


router.get('/api/events', event_get )
router.get('/api/events/:id/qr', getEventQr)
router.post('/api/create/events', createEvent_post)

module.exports = router
