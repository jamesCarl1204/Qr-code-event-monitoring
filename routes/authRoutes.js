const express = require('express')
const {register_post,login_post,logout_post, registerValidation, getCurrentUser,loginLimiter} = require('../controllers/authController')
const router = express.Router()

router.post('/register', registerValidation, register_post)
router.post('/login', loginLimiter, login_post)
router.get('/api/me', getCurrentUser)
router.post('/logout', logout_post)
module.exports = router