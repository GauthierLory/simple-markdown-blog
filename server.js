const express = require('express')
const articleRouter = require('./routes/article.js')
const app = express()

app.set('view engine', 'ejs')

app.use('/articles',articleRouter)

app.get('/',(req, res) => {
    const articles = [{
        title: 'Test articles',
        createdAt: new Date(),
        description: 'Test description'

    },
    {
        title: 'Test articles 2',
        createdAt: new Date,
        description: 'Test description 2'

    }]
    res.render('index', { articles : articles })
})

app.listen(5000)