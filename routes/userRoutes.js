const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/create', userController.createUser);
router.get('/:id', userController.getUserById);
exports.updateUser = async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.body.userId, req.body, { new: true, runValidators: true });
      if (!updatedUser) return res.status(404).json({ message: "Utilisateur non trouvé" });
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
router.delete('/delete:id', userController.deleteUser);

module.exports = router;