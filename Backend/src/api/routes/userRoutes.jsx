const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.jsx');

router.get('/:username', userController.getUserProfile);
router.put('/:username', userController.updateUserProfile);
router.post('/', userController.addUserProfile);

module.exports = router;
