const asyncHandler = require('express-async-handler');
const db = require('../models');

const Agents = db.Agents;

// Create and save a new Agent
exports.create = asyncHandler(async (req, res) => {
  // Validate request
  if (!req.body.agentBIN || !req.body.agentName|| !req.body.agentEmail || 
    !req.body.agentPassword || !req.body.servicesOffered || !req.body.phoneNumber 
    || !req.body.agentAuthorizationLetter ) {
    res.status(400).send({
      message: ('agentBIN, agentName, agentEmail,agentPassword, servicesOffered and phoneNumber cannot be empty'),
    });
    return;
  }

  // Create an agent object
  const Agent = {
    agentBIN: req.body.agentBIN,
    agentName: req.body.agentName,
    agentEmail: req.body.agentEmail,
    agentPassword: req.body.agentPassword,
    servicesOffered: req.body.servicesOffered,
    phoneNumber: req.body.phoneNumber,
    agentAuthorizationLetter: req.body.agentAuthorizationLetter
  };

  // Save agents in the database
  const data = await Agents.create(Agent);
  res.send(data);
});

// Retrieve all agents from the database
exports.findAll = asyncHandler(async (req, res) => {
  const data = await Agents.findAll();
  res.send(data);
});

// Find a single agent by id
exports.findOne = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const data = await Agents.findByPk(id);
  if (!data) {
    res.status(404).send({
      message: (`Agent with id=${id} not found`),
    });
  } else {
    res.send(data);
  }
});

// Update an agent by id
exports.update = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const [num] = await Agents.update(req.body, {
    where: { id: id },
  });

  if (num === 1) {
    res.send({
      message: 'Agent was updated successfully.',
    });
  } else {
    res.send({
      message: (`Cannot update agent with id=${id}. agent not found or req.body is empty!`),
    });
  }
});

// Delete an agent by id
exports.delete = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const num = await Agents.destroy({
    where: { id: id },
  });

  if (num === 1) {
    res.send({
      message: 'agent was deleted successfully!',
    });
  } else {
    res.send({
      message: (`Cannot delete agent with id=${id}. agent not found!`),
    });
  }
});