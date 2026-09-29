function requireRole(role) {
    return (req, res, next) => {
        if(!req.session.user) return res.redirect('/')
        if(req.session.user.role !== role) return res.status(403).json({success: false, msg:'forbidden'})
            next()
    }

}

module.exports = {requireRole}