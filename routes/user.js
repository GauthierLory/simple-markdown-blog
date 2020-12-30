const express = require('express')
const router = express.Router()

const User = require('../models/user.js')
const {isAuthenticated, isNotAuthenticated} = require('../config/credential')

router.get('/info',isAuthenticated, async(req, res) => {
    const users = await User.find()
        res.render('user/index.ejs', { 
        users: users,
     })
})

router.get('/edit/:id', isAuthenticated, async(req, res)=>{
    const user = await User.findById(req.params.id)
    res.render('user/edit.ejs', { user: user })
})

router.delete('/:id', isAuthenticated, async(req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res.redirect('/user/info')
})

module.exports = router;