const {pool} = require('../config/db')
const bcrypt = require('bcrypt')

const studentModel = {

    async isEmailExist(email) {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email])
        
        return rows[0]
    },

    async createAccount(studentId, name, middleName, lastName, email, password,) {
        const salt = 12
        const hashedPassword = await bcrypt.hash(password, salt)
        const [result] = await pool.query('INSERT INTO users (student_id, name, middle_name, last_name, email, password, role) VALUES(?,?,?,?,?,?,?)',
            [studentId, name, middleName, lastName, email, password, 'student']
        )
        return result.insertId
    }
}

module.exports= {studentModel}
