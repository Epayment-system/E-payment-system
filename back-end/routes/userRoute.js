const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController.js');

// Get all users
router.get('/', userController.get);

// Create a new user
router.post('/', userController.upload, userController.create);

// User login
router.post('/login', userController.login);

// Get a single user by ID
router.get('/:id', userController.getById);

// Update a user by ID
router.put('/:id', userController.upload, userController.update);

// Delete a user by ID
router.delete('/:id', userController.Delete);

module.exports = router;