const router = require('express').Router();
// const { decodeBase64 } = require('bcryptjs');
const { User } = require('../../models/')

router.post('/register', (req,res) => {

  User.create(req.body).then(newUser => res.json(newUser))
  .catch(err => console.log(err));
})

module.exports = router;
  