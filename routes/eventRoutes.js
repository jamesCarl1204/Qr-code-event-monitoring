const express = require('express')
const router = express.Router()
const {event_get, createEvent_post} = require('../controllers/eventControllers')
 


router.get('/api/event', event_get )
router.post('/api/create/event', createEvent_post)

