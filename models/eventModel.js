const {pool} = require('../config/db')

const eventModel = {

    async getEvents() {
        const [rows] = await pool.query('SELECT * FROM events')
        
        return rows

    },

    async createEvents(eventName, eventDate, eventTime, eventVenue) {
        const [result] = await pool.query('INSERT INTO events (event_name, event_date, event_time, event_venue) VALUES(?,?,?,?)',
            [eventName, eventDate, eventTime, eventVenue]
        )

        return result.insertId
    }
}

module.exports = eventModel