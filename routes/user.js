const bcrypt = require('bcrypt')
const passport = require('passport')
const express = require('express')
const router = express.Router()

const User = require('../models/user.js')
const {isAuthenticated, isNotAuthenticated} = require('../config/credential')

router.get('/info', (req, res) => {
    res.render('auth/user.ejs', { name: req.user.name })
})
module.exports = router;
