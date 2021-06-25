const router = require('express').Router();
const userRoute = require('./userRoute');
const registerRoute = require('./registerRoute')
const gameRoutes = require('./gameRoutes')
const profileRoutes = require('./profileRoutes')

router.use('/user', userRoute);
router.use('/register', registerRoute)
router.use('/gameRoutes', gameRoutes)
router.use('/profile', profileRoutes)

module.exports = router;
