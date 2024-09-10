const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/create', userController.createUser);
router.get('/:id', userController.getUserById);
router.put('/udpate:id', userController.updateUser);
router.delete('/delete:id', userController.deleteUser);

module.exports = router;