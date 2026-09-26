const {pool} = require('../config/db')
const {body, validationResult} = require('express-validator')
const {studentModel} = require('../models/studentModel')

const registerValidation = [
    body(studentId).isLength({min:8, max:8}).withMessage('id should be exactly 8'),
    body(email).isEmail().withMessage('please enter a valid email'),
    body(password).isLength({min:8}).withMessage('Password must be at least 8 characters')
]

const register_post = async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({success:false, errors: errors.array()})
    }

    try {
    
    const {studentId, name, middleName, lastName, email, password, confirmPassword} = req.body

     const rows = await studentModel.isEmailExist(email)

     if(rows.length > 0) {
        return res.status(400).json({msg: 'email exist'})
     }

    if(password !== confirmPassword) {
        return res.status(400).json({path: 'password', msg:'password do not match' })
    }

    const id = await studentModel.createAccount(studentId, name, middleName, lastName, email, password)

    if(id) {
        res.status(200).json({success: true, msg: 'account created'})
    }

    } catch(err) {
        console.log(err)
    }
}

module.exports = {register_post, registerValidation}