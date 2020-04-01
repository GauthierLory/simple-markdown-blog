if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article.js')
const articleRouter = require('./routes/article.js')
const authRouter = require('./routes/auth.js')
const methodOverride = require('method-override')
const flash = require('express-flash')
const passport = require('passport')
const session = require('express-session')
const app = express()

const initializePassport = require('./config/passport-config.js')
initializePassport(passport)

mongoose.connect('mongodb://localhost:27017/blog', { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(flash())

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())


app.get('/',async (req, res) => {
    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('articles/index', { articles : articles })
})

app.use('/articles', articleRouter)
app.use('/', authRouter);

app.listen(5000)