const router = require('express').Router();
// const withAuth = require('../utils/helpers/auth')
const path = require('path')


router.get('/', async (req, res) => {
    res.render('homepage');
});

router.get('/register', async (req, res) => {
    // Send the rendered Handlebars.js template back as the response
    res.render('register');
});

router.get('/game', async (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
})

module.exports = router;