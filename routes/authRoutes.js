const express = require('express')
const {register_post, registerValidation} = require('../controllers/authController')
const router = express.Router()

router.post('/register', registerValidation, register_post)


module.exports = router