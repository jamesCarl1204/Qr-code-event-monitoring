const studentModel = require('../models/studentModel')

const getScanCount = async (req, res) => {
    try {
        const userId = req.session.user.id
        
        const count = await studentModel.getAttendanceCount(userId)

        res.status(200).json({success: true, count: count})
    } catch(err) {
        console.log(err)
    }
}

const scanAttendance = async (req, res) => {
    try {

        const { qrData } = req.body

        const userId = req.session.user.id

        const event = await studentModel.getEventByToken(qrData)

        if(!event) {
            return res.status(400).json({success: false, msg: 'Invalid Qr code'})
        }

        try {
        await studentModel.recordAttendance(event.id, userId)

        res.status(200).json({sucess: true, msg: 'attendance recorded'})
        } catch(err) {

            if(err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({success: false, msg: 'you already attended this event'})
            }

            res.status(500).json({success: false, msg: 'server error'})
        }
   
    } catch(err) {
        console.log(err)

    }
}

const getStudentEvents = async (req,res) => {
    try {
        const userId = req.session.user.id
        
        const events = await studentModel.getStudentEvents(userId)

        res.status(200).json({success: true, events: events})

    } catch(err) {
        console.log(err)
    }
}

module.exports = {scanAttendance, getScanCount, getStudentEvents}