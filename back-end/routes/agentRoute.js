const express = require('express');
const agentRouter = express.Router();
const AgentController = require('../controller/agentController.js');


agentRouter.post('/',AgentController.upload,AgentController.create)
agentRouter.post('/login',AgentController.login)

agentRouter.get('/', AgentController.findAll)
agentRouter.get('/:id', AgentController.findOne)
agentRouter.put('/:id', AgentController.update)
agentRouter.delete('/:id', AgentController.delete)

module.exports= agentRouter





