const express = require('express')
const router = express.Router();
const Article = require('../models/ArticleModel')
router.get('/', async(req, res) => {
  const articles = await Article.find({ author: req.user._id })

  res.render('dashboard', {
    user: req.user,
    page: 'dashboard',
    articles: articles
  })
})


module.exports = router