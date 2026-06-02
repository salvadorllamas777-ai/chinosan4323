const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const auth = require('../middleware/auth');
const { validateUser, validateUserUpdate } = require('../validators/usersValidator');

router.use(auth);

router.get('/', usersController.getUsers);
router.get('/:id', usersController.getUserById);
router.put('/:id', validateUserUpdate, usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;
