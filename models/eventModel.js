const {pool} = require('../config/db')
const crypto = require('crypto')
const QRCode = require('qrcode')


const eventModel = {

    async getEvents() {
        const [rows] = await pool.query(`
            SELECT events.*,
              COUNT(event_attendance.id) AS attendance_count
              FROM events
              LEFT JOIN event_attendance
              ON events.id = event_attendance.event_id
              GROUP BY events.id
             `)
        
        return rows

    },

    async createEvents(eventName, eventDate, eventTime, eventVenue) {
        const qr_token = crypto.randomUUID()
        const [result] = await pool.query('INSERT INTO events (event_name, event_date, event_time, venue, qr_token) VALUES(?,?,?,?,?)',
            [eventName, eventDate, eventTime, eventVenue, qr_token]
        )

        return result.insertId
    },

    async getEventById(eventId) {
        const [rows] = await pool.query(
            'SELECT * FROM events WHERE id = ?',
            [eventId]
        )

        return rows[0]
    },

    async getRecordById(eventId) {
        const [rows] = await pool.query(
            `SELECT 
                event_attendance.id,
                users.student_id,
                users.first_name,
                users.middle_name,
                event_attendance.scanned_at
                FROM event_attendance
                JOIN users
                 ON event_attendance.user_id = users.id
                 WHERE event_attendance.event_id = ?
                 `,
            [eventId]
        )

        return rows
    },

    async getStudents() {
        const [rows] = await pool.query('SELECT COUNT(*) AS total_student FROM users WHERE role = "student" ')
        return rows[0]
    }
   
}

module.exports = eventModel