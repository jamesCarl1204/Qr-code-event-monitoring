const express = require('express')
const {register_post,login_post, registerValidation} = require('../controllers/authController')
const router = express.Router()



router.post('/register', registerValidation, register_post)
router.post('/login', login_post)
router.get('/api/events')
module.exports = router