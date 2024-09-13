const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/create', userController.createUser);
router.get('/:id', userController.getUserById);
router.post('/update', userController.updateUser);
router.post('/delete', userController.deleteUser);

module.exports = router;