const router = require('express').Router();
const bcrypt = require('bcrypt')
const { User } = require('../models')



router.get('/register', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render('register');
});

router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    User.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/')
  } catch {
    req.redirect('register')
  }
})

module.exports = router;