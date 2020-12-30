const bcrypt = require('bcrypt')
const passport = require('passport')
const express = require('express')
const router = express.Router()

const User = require('../models/user.js')
const {isAuthenticated, isNotAuthenticated} = require('../config/credential')

router.get('/login',isNotAuthenticated ,(req, res) => {
    res.render('auth/login.ejs')
})

router.post('/login',isNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/user/index',
    failureRedirect: '/login',
    failureFlash: true
}))

router.get('/register',isNotAuthenticated ,(req, res) => {
    res.render('auth/register.ejs')
})

router.delete('/logout',(req, res) => {
    req.logout()
    res.redirect('/login')
})

router.post('/register',isNotAuthenticated ,async (req, res) =>{
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
