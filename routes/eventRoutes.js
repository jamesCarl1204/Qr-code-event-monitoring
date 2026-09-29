const express = require('express')
const router = express.Router()
const {event_get, createEvent_post} = require('../controllers/eventControllers')
 


router.get('/api/events', event_get )
router.post('/api/create/events', createEvent_post)

