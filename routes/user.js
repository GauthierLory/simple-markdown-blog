const bcrypt = require('bcrypt')
const passport = require('passport')
const Users = require('../models/user')
const express = require('express')
const router = express.Router()

const User = require('../models/user.js')
const {isAuthenticated, isNotAuthenticated} = require('../config/credential')

router.get('/info',isAuthenticated, async(req, res) => {
    const users = await User.find()
    res.render('user/index.ejs', { users: users })
})
module.exports = router;


router.delete('/:id', isAuthenticated, async(req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res.redirect('/user/info')
})