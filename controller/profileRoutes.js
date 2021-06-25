const router = require('express').Router();
const { User } = require('../models/users')


router.get('/profile', function (req, res, next) {
  res.render('profile');
});

router.post('/profile:id', function (req, res, next) {
  res.end('profile' + req.params.id);
});

module.exports = router;
