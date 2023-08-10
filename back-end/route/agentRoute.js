const express = require('express');

const AgentController = require('../controllers/agentController.js');

const agentRouter = express.Router();

// Define routes for Agents
agentRouter.post('/',AgentController.upload,AgentController.create)
agentRouter.post('/login',AgentController.agentLogin)
agentRouter.get('/', AgentController.findAll)
agentRouter.get('/:id', AgentController.findOne)
agentRouter.put('/:id', AgentController.update)
agentRouter.delete('/:id', AgentController.delete)

module.exports= agentRouter;








