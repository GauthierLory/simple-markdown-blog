app.get('/login',async(req, res) => {
    const users = await User.find()
    res.render('login.ejs', { users: users })
})

app.post('/login',passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.post('/register', async (req, res) =>{
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