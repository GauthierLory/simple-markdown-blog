const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article.js')
const User = require('./models/user.js')
const articleRouter = require('./routes/article.js')
const methodOverride = require('method-override')
const bcrypt = require('bcrypt')
const app = express()

mongoose.connect('mongodb://localhost:27017/blog', { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/',async (req, res) => {
    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('articles/index', { articles : articles })
})

app.get('/register', (req, res) => {
    res.render('register.ejs', { register: 'register page'})
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
})


app.use('/articles',articleRouter)

app.listen(5000)