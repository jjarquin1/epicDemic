const router = require("express").Router();
const htmlRoutes = require("./htmlRoutes");
const apiRoutes = require('./api');
// const homeRoutes = require('./homeRoutes')

router.use('/api', apiRoutes)
router.use(htmlRoutes);
// router.use('/', homeRoutes);

module.exports = router;