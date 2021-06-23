const router = require('express').Router();

router.get('/game', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.sendFile(__dirname + '../index.html');
});

module.exports = router;
