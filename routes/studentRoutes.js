const express = require('express')
const router = express.Router()
const {scanAttendance, getScanCount, getStudentEvents} = require('../controllers/studentController')

router.post('/api/attendance/scan', scanAttendance)
router.get('/api/attendance/count', getScanCount)
router.get('/api/student/events', getStudentEvents)

module.exports = router