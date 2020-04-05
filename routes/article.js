const express = require('express')
const Article = require('./../models/article')
const Category = require('./../models/category')
const router = express.Router()
const {isAuthenticated} = require('../config/credential')


router.get('/new',isAuthenticated,async(req, res) => {
    const categories = await Category.find({})
    res.render('articles/new', { article: new Article, categories: categories})
})

router.get('/edit/:id',isAuthenticated, async(req, res) => {
    const categories = await Category.find({})
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', { article: article, categories: categories})
})

router.get('/:slug', async (req, res) => {
    const article = await Article.findOne( { 
        slug: req.params.slug }).populate('category').exec()
    if (article == null) res.redirect('/')
    res.render('articles/show', { article: article })
})

router.post('/',isAuthenticated, async(req, res, next) => {
    req.article = new Article()
    next()
}, saveArticleAndRedirect('new'))

router.put('/:id',isAuthenticated, async(req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'))

router.delete('/:id',isAuthenticated, async(req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

function saveArticleAndRedirect(path){
    return async (req, res) => {
        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
        article.category = req.body.category
        try{
            article = await article.save()
            res.redirect(`/articles/${article.slug}`)
        }catch (e){
            console.log(e)
            res.render('articles/#{path}', { article: article })
        }
    }
}

module.exports = router