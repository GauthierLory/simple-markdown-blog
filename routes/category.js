const express = require('express')
const Category = require('../models/category')
const router = express.Router()
const {isAuthenticated} = require('../config/credential')

router.get('/index',isAuthenticated ,async (req, res) => {
    const categories = await Category.find().sort({
        createdAt: 'desc'
    })
    res.render('category/index', { categories : categories })
})

router.get('/new',isAuthenticated,(req, res) => {
    res.render('category/new', { category: new Category })
})

router.get('/edit/:id',isAuthenticated, async(req, res) => {
    const category = await Category.findById(req.params.id)
    res.render('category/edit', { category: category })
})

router.post('/',isAuthenticated, async(req, res, next) => {
    req.category = new Category()
    next()
}, saveArticleAndRedirect('new'))

router.put('/:id',isAuthenticated, async(req, res, next) => {
    req.category = await Category.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'))

router.delete('/:id',isAuthenticated, async(req, res) => {
    await Category.findByIdAndDelete(req.params.id)
    res.redirect('/categories')
})

function saveArticleAndRedirect(path){
    return async (req, res) => {
        let category = req.category
        category.title = req.body.title
        try{
            category = await category.save()
            res.redirect('/categories')
        }catch (e){
            console.log(e)
            res.render('categories')
        }
    }
}

module.exports = router