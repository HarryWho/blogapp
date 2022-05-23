const express = require('express')
const router = express.Router();
const { Validate } = require('../middleware/Validation')
const User = require('../models/UserModel')
const bcrypt = require('bcryptjs')
const passport = require('passport')
require('../config/LocalStratagy')

router.get('/login', (req, res) => {
  res.render('login')

})

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/auth/login' }),
  function(req, res) {
    res.redirect('/dashboard');
  });

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  Validate(req.body).then((body) => {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(body.password, salt, function(err, hash) {
        body.password = hash;
        console.log(body.password)
        const user = new User({
          displayName: body.displayName,
          email: body.email,
          password: body.password
        })
        user.save().then(result => {
          res.redirect('/auth/login');
        })
      });

    });
  }).catch((errors) => {
    res.render('register', { errors })
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/auth/login')
})
module.exports = router