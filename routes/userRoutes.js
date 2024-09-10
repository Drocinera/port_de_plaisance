const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/create', UserController.createUser);
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;