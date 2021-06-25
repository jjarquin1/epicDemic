const router = require('express').Router();
const { User } = require('../models/users')
const withAuth = require('../utils/helpers/helpers');


router.get('/', function (req, res, next) {
  res.end('index');
});

router.get('/', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render('homepage');
});

router.get('/login', function (req, res, next) {
  res.end('login');
});

router.get('/profile:id', function (req, res, next) {
  res.end('profile' + req.params.id);
});



router.get('/profile', function (req, res, next) {
  res.render('profile');
});

router.get('/game:id', function (req, res, next) {
  res.end('game' + req.params.id);
});

router.post('/game:id', function (req, res, next) {
  res.end('game');
});

// // Prevent non logged in users from viewing the homepage
// router.get('/', withAuth, async (req, res) => {
//   try {
//     const userData = await User.findAll({
//       attributes: { exclude: ['password'] },
//       order: [['name', 'ASC']],
//     });

//     const users = userData.map((profile) => profile.get({ plain: true }));

//     res.render('homepage', {
//       users,
//       // Pass the logged in flag to the template
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/login', (req, res) => {
//   // If a session exists, redirect the request to the homepage
//   if (req.session.logged_in) {
//     res.redirect('/');
//     return;
//   }

//   res.render('login');
// });



module.exports = router;
