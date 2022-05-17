const express = require('express')
const router = express.Router();
const { Validate } = require('../middleware/Validation')
router.get('/login', (req, res) => {
  res.render('login')
})


router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  Validate(req.body).then((body) => {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(body.password, salt, function(err, hash) {

      });
    });
  }).catch((errors) => {
    res.render('register', { errors })
  })
})

module.exports = router