const express = require('express');
const userController = require('../controllers/userController');
const {authenticateToken} = require('../middleware/middlewares');
const router = express.Router();

router.get('/users',authenticateToken,userController.getAllUsers);
router.get('/user/:id',authenticateToken, userController.getUserById);
router.post('/user',authenticateToken, userController.createUser);
router.put('/user/:id',authenticateToken, userController.updateUser);
router.delete('/user/:id',authenticateToken, userController.deleteUser);

module.exports = router;
