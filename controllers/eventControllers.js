const eventModel = require('../models/eventModel')


const createEvent_post = (req,res) => {
    const {event_name, event_date, event_time, venue} = req.body

    eventModel.createEvents(event_name, event_date, event_time, venue)

    req.status(200).json({success: true, msg: 'success created'})

}

const event_get = (req, res) => {
    res.status(200).json({success: true, data: eventModel.getEvents})
}

module.exports = {createEvent_post, event_get}