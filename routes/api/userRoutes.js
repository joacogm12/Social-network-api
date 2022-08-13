const router = require('express').Router();
const userControllers = require('../../controllers/userControllers')

router.route('/').get(userControllers.getAllUsers);

module.exports = router;
