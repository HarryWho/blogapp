const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('dashboard', { user: req.user, page: 'dashboard' })
  } else {
    res.redirect('/auth/login')
  }
})


module.exports = router