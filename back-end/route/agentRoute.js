const express = require('express');

const AgentController = require('../controllers/agentController.js');

const agentRouter = express.Router();

// Define routes for Agents
//agentRouter.post('/register',AgentController.agentRegistration)
agentRouter.post('/login',AgentController.agentLogin)
agentRouter.post('/',AgentController.create)
agentRouter.get('/', AgentController.findAll)
agentRouter.get('/:id', AgentController.findOne)
agentRouter.put('/:id', AgentController.update)
agentRouter.delete('/:id', AgentController.delete)

module.exports= agentRouter;








