const express = require('express')
const path =require('path')
const app = express()
const routes = require('./routes/authRoutes')
const eventRoutes = require('./routes/eventRoutes')
const session = require('express-session');
require('dotenv').config()

const {requireRole, checkUser}= require('./middleware/authMiddleware')

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 * 2}
}))

app.use(express.json())
app.use(routes)
app.use(eventRoutes)
app.use(express.static(path.join(__dirname, 'public')))



app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'login.html'))
})
app.get('/student/dashboard', requireRole('student'), (req, res) =>{
    res.sendFile(path.join(__dirname,  'public/studentPortal', 'index.html'))
})

app.get('/admin/dashboard', requireRole('admin'), (req, res) => {
    res.sendFile(path.join(__dirname, 'public/adminPortal', 'index.html'))
})


app.listen(3000)