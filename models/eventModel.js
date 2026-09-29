const {pool} = require('../config/db')
const crypto = require('crypto')
const QRCode = require('qrcode')
const qr_token = crypto.randomUUID()

const eventModel = {

    async getEvents() {
        const [rows] = await pool.query('SELECT * FROM events')
        
        return rows

    },

    async createEvents(eventName, eventDate, eventTime, eventVenue) {
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
    }
}

module.exports = eventModel