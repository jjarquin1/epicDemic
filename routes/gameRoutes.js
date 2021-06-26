const router = require('express').Router();
// const withAuth = require('../utils/helpers/auth')
const path = require('path')

router.get('/game', async (req,res) => {
res.sendFile(path.join(__dirname,'../public/index.html'));
}) 

module.exports = router;