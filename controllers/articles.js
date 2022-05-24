const express = require('express')
const router = express.Router()
const Article = require('../models/ArticleModel')

router.get('/create', (req, res) => {

  res.render('dashboard', { user: req.user, page: 'editor', caption: 'Create', action: '/article' })
})

router.get('/', async(req, res) => {
  const articles = await Article.find({ status: 'public' }).populate({
    path: 'author'
  })
  res.render('dashboard', {
    user: req.user,
    page: 'articles',
    articles: articles
  })
})

router.get('/:articleID', async(req, res) => {
  const article = await Article.findById(req.params.articleID).populate({
    path: 'author'
  })
  res.render('dashboard', {
    user: req.user,
    page: 'article',
    article: article
  })

})



router.get('/edit/:articleID', async(req, res) => {
  const article = await Article.findOne({ _id: req.params.articleID })
  res.render('dashboard', {
    user: req.user,
    page: 'editor',
    article: article,
    caption: 'Edit',
    action: `/article/${article._id}?_method=PUT`
  })
})

router.get('/delete/:articleID', async(req, res) => {
  await Article.findByIdAndDelete(req.params.articleID)
  res.redirect('/dashboard')
})

router.post('/', (req, res) => {
  const article = new Article(req.body)
  article.save((err, article) => {
    if (err) throw err
    res.redirect('/dashboard')
  })
})

router.put('/:articleID', async(req, res) => {
  await Article.findByIdAndUpdate(req.params.articleID, req.body)
  res.redirect('/dashboard')
})

router.delete('/:articleID', async(req, res) => {

  await Article.findByIdAndDelete(req.params.articleID)
  res.redirect('/dashboard')
})
module.exports = router;