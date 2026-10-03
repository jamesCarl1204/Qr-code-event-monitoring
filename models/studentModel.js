const {pool} = require('../config/db')

const studentModel = {

   async getEventByToken(qrToken) {
        const [rows] = await pool.query(
            'SELECT id FROM events WHERE qr_token = ?',
            [qrToken]
        )
        return rows[0]
    },
     
    async getAttendanceCount(userId) {
        const [rows] = await pool.query(
            `SELECT COUNT(*) AS count
            FROM event_attendance
            WHERE user_id = ?`,
            [userId]
        )
        return rows[0].count
        
    },

    async recordAttendance(eventId, userId) {
            const [result] = await pool.query(
                `INSERT INTO event_Attendance (event_id, user_id)
                VALUES (?, ?)`,
                [eventId, userId]
            )
            return result.insertId
        },
}
module.exports = {studentModel}