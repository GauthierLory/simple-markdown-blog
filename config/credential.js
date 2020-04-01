module.exports = {
    isAuthenticated: function checkAuthenticated(req, res, next){
        if(req.isAuthenticated()){
            return next()
        }
        res.redirect('/login')
    }
}