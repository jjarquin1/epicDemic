const router = require('express').Router();
const {User} = require('../models/users')



router.get('/register', async (req, res) => {
    // Send the rendered Handlebars.js template back as the response
    res.render('register');
  });


  module.exports = router;