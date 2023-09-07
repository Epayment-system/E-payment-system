const express = require('express');
const userRouter = express.Router();

const userController = require('../controller/userController.js');
// userRouter.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001'); // Replace with your client's URL
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     next();
//   });

// Define routes for bills resource
userRouter.post('/', userController.create);
userRouter.post('/login', userController.login);
userRouter.post('/updatePasswordWithToken', userController.updatePasswordWithToken);
userRouter.post('/requestPasswordReset', userController.requestPasswordReset);
userRouter.post('/logout', userController.logout );
userRouter.get('/', userController.findAll);
userRouter.get('/:id', userController.findOne);
userRouter.put('/:id', userController.update);
userRouter.delete('/:id', userController.delete);

module.exports = userRouter;
