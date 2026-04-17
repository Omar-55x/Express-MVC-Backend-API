const express = require('express');
const router = express.Router();
const userController = require('../../controllers/usersController');

router.route('/')
    .get(userController.getAllUsers)
    
router.route('/:id')
    .delete(userController.deleteUser)
    
module.exports = router;