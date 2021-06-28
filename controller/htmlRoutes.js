const router = require('express').Router();
const path = require('path')
const { User } = require('../models/');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
    res.render('frontpage');
});

router.get('/register', async (req, res) => {
    // Send the rendered Handlebars.js template back as the response
    res.render('register');
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/game');
        return;
    }
    res.render('login');
});
router.get('/logout', (req, res) => {
    res.render('/login');
});

router.get('/game', async (req, res) => {
    res.render('game');
})

router.get('/game', withAuth, async (req, res) => {
    try {
      const userData = await User.findAll({
        attributes: { exclude: ['password'] },
        order: [['email']],
      });
  
      const users = userData.map((project) => project.get({ plain: true }));
  
      res.render('frontpage', {
        users,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;