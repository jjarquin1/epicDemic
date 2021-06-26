const router = require('express').Router();
const withAuth = require('../utils/helpers/auth')
const { User } = require('../models')


router.get('/profile', withAuth, async (req,res) => {
 try {
  const userData = await User.findAll({
    attributes: {exclude: ['password']},
    order: [['username']]
  });
    res.render('profile', {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err){
    res.status(500).json(err);
  }
})

router.get('/', (req,res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('/')
})

module.exports = router