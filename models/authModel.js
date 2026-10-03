const {pool} = require('../config/db')
const bcrypt = require('bcrypt')

const studentModel = {

    async isEmailExist(email) {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email])
        
        return rows
    },

    async createAccount(studentId, first_name, middleName, lastName, email, password,) {
        const salt = 12
        const hashedPassword = await bcrypt.hash(password, salt)
        const [result] = await pool.query('INSERT INTO users (student_id, first_name, middle_name, last_name, email, password, role) VALUES(?,?,?,?,?,?,?)',
            [studentId, first_name, middleName, lastName, email, hashedPassword, 'student']
        )
        return result.insertId
    },

    async getPassword(email) {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?',[email])

        return rows[0]
    }
}

module.exports= {studentModel}
