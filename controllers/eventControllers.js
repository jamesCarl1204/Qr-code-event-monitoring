const eventModel = require('../models/eventModel')
const QRCode = require('qrcode')

const createEvent_post = async (req,res) => {

    try {
    const {event_name, event_date, event_time, venue} = req.body

   const eventId = await eventModel.createEvents(event_name, event_date, event_time, venue)

    res.status(200).json({success: true, msg: eventId})

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

const getEventQr = async (req, res) => {
    try {
        const {id} = req.params

        const event = await eventModel.getEventById(id)

        if(!event) {
            return res.status(404).json({success: false, msg: 'event not found'})
        }

        const qr = await QRCode.toDataURL(event.qr_token)

        res.status(200).json({success: true, qr: qr})

    } catch(err) {
        console.log(err)
    }

}

const getRecords = async (req, res) => {
    try {
        const {id} = req.params;

        const records = await eventModel.getRecordById(id);

        if(!records) {
            return res.status(400).json({success: false, msg: 'not found'})
        }

        res.status(200).json({success: true, records})

    }
    catch(err) {
        console.log(err)
    }
}
module.exports = {createEvent_post, event_get,getEventQr, getRecords}