const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { validateUser } = require('../validators/usersValidator');

router.get('/', usersController.getUsers);
router.post('/', validateUser, usersController.createUser);

module.exports = router;
