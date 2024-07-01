const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/profile/:username', userController.getUserProfile);
router.put('/profile/:username', userController.updateUserProfile);
router.post('/profile', userController.addNewUserProfile);

module.exports = router;
