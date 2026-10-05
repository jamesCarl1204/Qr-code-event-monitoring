const {pool} = require('../config/db')
const {body, validationResult} = require('express-validator')
const {studentModel} = require('../models/authModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const maxAge = 30 * 24 * 60 * 60;
const rateLimit = require('express-rate-limit')

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { success: false, msg: 'Too many login attemps, try again later'},
    standardHeaders: true,
    legacyHeaders: false
})
const registerValidation = [
    body('studentId').isLength({min:8, max:8}).withMessage('id should be exactly 8'),
    body('email').isEmail().withMessage('please enter a valid email'),
    body('password').isLength({min:8}).withMessage('Password must be at least 8 characters')
]

function createToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: maxAge} )
}

const register_post = async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({success:false, errors: errors.array()})
    }

    try {
    
    const {studentId, name, middleName, lastName, email, password, confirmPassword} = req.body

     const rows = await studentModel.isEmailExist(email)

     if(rows.length > 0) {
        return res.status(400).json({errors: [{path:'email', msg: 'email exist'}] })
     }

    if(password !== confirmPassword) {
        return res.status(400).json({errors:[{path: 'confirmPassword', msg:'password do not match'}]})
    }


    const id = await studentModel.createAccount(studentId, name, middleName, lastName, email, password)

    if(id) {
        res.status(200).json({success: true, msg: 'account created'})
    }

    } catch(err) {
        console.log(err)

    }
}

const login_post = async (req, res) => {
    const {email, password} = req.body; 

     try {

     const account = await studentModel.getPassword(email)
     console.log(email, password)
     console.log(account)
     
     if(!account) {
        return res.status(400).json({success: false, msg: 'Invalid email or password1'})
     }
     const isMatch = await bcrypt.compare(password, account.password) 
     const isMatchforAdmin = account.password === password

     if(!isMatch && !isMatchforAdmin) {
        return res.status(400).json({success:false, msg: 'Invalid email or password2'})
     }

     req.session.user = {id: account.id, role: account.role, fullname: account.first_name + " " + account.middle_name + " " + account.last_name}

     const redirect = account.role === 'admin' ? '/admin/dashboard' : '/student/dashboard'


      res.status(200).json({success: true,  redirect: redirect})
    } catch (err) {
        console.log(err)
    }
}



const getCurrentUser = (req, res) => {
    if(!req.session.user) {
        return res.json({user: null})
    }
    return res.json({user: req.session.user})
}

module.exports = {register_post, registerValidation, login_post, getCurrentUser, loginLimiter}