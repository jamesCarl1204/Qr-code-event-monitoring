const eventModel = require('../models/eventModel')


const createEvent_post = async (req,res) => {

    try {
    const {event_name, event_date, event_time, venue} = req.body

   const eventId = await eventModel.createEvents(event_name, event_date, event_time, venue)

    req.status(200).json({success: true, msg: eventId})
    }catch(err) {
        console.log(err)
    }
}

const event_get = async (req, res) => {
    try { 
        const events = await eventModel.getEvents()

     res.status(200).json({success: true, events})
    } catch(err) {
        console.log(err)
    }
}

module.exports = {createEvent_post, event_get}