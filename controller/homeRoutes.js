const router = require('express').Router();
const {User} = require('../models/users')

app.use(connectRoute(function (router) {
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

  router.get('/game:id', function (req, res, next) {
    res.end('game' + req.params.id);
});

  router.post('/game:id', function (req, res, next) {
      res.end('game');
  });
}));

module.exports = router;
