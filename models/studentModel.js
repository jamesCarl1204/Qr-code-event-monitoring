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
    
    async getEvents(userId) {
        const [rows] = pool.query(`
        SELECT
           events.id,
           events.event_name,
           events.event_date,
           events.event_time,
           events.venue
           CASE
             WHEN event_attendance.user_id IS NOT NULL
             THEN 'attended
             ELSE 'Not attended
            END AS status
            FROM events
            LEFT JOIN  event_attendance
            ON events.id = event_attendance.event_id
            AND event_attendance.user_id = ? 
            ORDER BY events.event_date DESC`, [userId])
    }
}
module.exports = studentModel