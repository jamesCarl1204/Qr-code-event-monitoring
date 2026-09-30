const {pool} = require('../config/db')

function requireRole(role) {
    return (req, res, next) => {
        if(!req.session.user) return res.redirect('/')
        if(req.session.user.role !== role) return res.status(403).json({success: false, msg:'forbidden'})
            next()
    }

}

 const checkUser = (req, res, next) => {
     const token = req.cookies.jwt;

     if(token) {
        jwt.verify(token, process.env.JWT_SECRET,  async (err, decodedToken) => {

            if(err) {
                console.log(err)
                console.log(decodedToken)
                res.locals.user = null
                next()
            } else {
                const [rows] = pool.query('SELECT * FROM users WHERE id = ?', [decodedToken.id])
                res.locals.user = rows[0]
                next()
            }
        })
     }
     else {
        res.locals.user = null
        next()
     }
}
module.exports = {requireRole, checkUser}