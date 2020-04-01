const bcrypt = require('bcrypt')
const passport = require('passport')
const express = require('express')
const router = express.Router()

const User = require('../models/user.js')
const {isAuthenticated} = require('../config/credential')

router.get('/login',(req, res) => {
    res.render('login.ejs')
})

router.post('/login',passport.authenticate('local', {
    successRedirect: '/test',
    failureRedirect: '/login',
    failureFlash: true
}))

router.get('/register', (req, res) => {
    res.render('register.ejs')
})

router.get('/test', (req, res) => {
    res.render('test.ejs', { name: req.user.name })
})

router.post('/register', async (req, res) =>{
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try{
        user = await user.save()
        res.redirect('/login')
    }catch{
        res.redirect('/register')
    }
    console.log(user)
})

module.exports = router;
