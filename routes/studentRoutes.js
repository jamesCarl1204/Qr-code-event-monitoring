const express = require('express')
const router = express.Router()
const {scanAttendance, getScanCount} = require('../controllers/studentController')

router.post('/api/attendance/scan', scanAttendance)
router.get('/api/attendance/count', getScanCount)

module.exports = router