const asyncHandler = require('express-async-handler');
const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Agents = db.Agents;

// Register new agent
const agentRegistration = asyncHandler(async (req, res) => {
  const { agentBIN, agentName, agentEmail, agentPassword, phoneNumber, agentAuthorizationLetter, servicesOffered } = req.body;

  if (!agentBIN || !agentName || !agentEmail || !agentPassword || !phoneNumber || !agentAuthorizationLetter || !servicesOffered) {
    res.status(400);
    throw new Error('Please fill all fields');
  }

  // Check if agent already exists
  const agentExists = await Agents.findOne({ where: { agentBIN } });
  if (agentExists) {
    res.status(400);
    throw new Error('Agent already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(agentPassword, salt);

  // Create an agent object
  const agent = {
    agentBIN,
    agentName,
    agentEmail,
    agentPassword: hashedPassword,
    phoneNumber,
    agentAuthorizationLetter,
    servicesOffered,
  };

  // Save agent in the database
  const createdAgent = await Agents.create(agent);
  res.status(201).json(createdAgent);
});


// Authenticate an agent
const agentLogin = asyncHandler(async (req, res) => {

  //extract the email/name and password 
  const {agentEmailOragentName,agentPassword}= req.body;

 
// Perform authentication logic 
if (agentEmailOragentName('@')) {

  //if the input contains '@', treat it as an email
  agent = await Agents.findOne({where: {agentEmail: agentEmailOragentName} });

}

else{
  //otherwise, treat it as an agentname
  agent =await Agents.findOne(
    {where:{agentName: agentEmailOragentName}});
}

if(!agent){
  res.status(401).json({ message:'Invalid email/username or password'});
}

 //compare the filled password with the hashed password stored in DB
const passwordMatch = await bcrypt.compare(agentPassword, agent.agentPassword);

if(!passwordMatch){
  res.status(401).json({message: 'Invalid email/username or password'});
  return;
}

//generate a JWT token

const token = jwt.sign({
  agentBIN: agent.agentBIN, agentEmail: agent.agentEmail},
process.env.JWT_SECRET,
{expireIn:'1h'}
);

//return the token and a success message

res.json({ token,message: 'agent logged in successfully'})

});

// Create and save a new Agent
const create = asyncHandler(async (req, res) => {
  // Validate request
  if (!req.body.agentBIN || !req.body.agentName || !req.body.agentEmail || !req.body.agentPassword || !req.body.servicesOffered || !req.body.phoneNumber || !req.body.agentAuthorizationLetter) {
    res.status(400).send({
      message: 'agentBIN, agentName, agentEmail, agentPassword, servicesOffered, and phoneNumber cannot be empty',
    });
    return;
  }

  // Create an agent object
  const agent = {
    agentBIN: req.body.agentBIN,
    agentName: req.body.agentName,
    agentEmail: req.body.agentEmail,
    agentPassword: req.body.agentPassword,
    servicesOffered: req.body.servicesOffered,
    phoneNumber: req.body.phoneNumber,
    agentAuthorizationLetter: req.body.agentAuthorizationLetter,
  };

  // Save agent in the database
  const data = await Agents.create(agent);
  res.send(data);
});

// Retrieve all agents from the database
const findAll = asyncHandler(async (req, res) => {
  const data = await Agents.findAll();
  res.send(data);
});

// Find a single agent by id
const findOne = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const data = await Agents.findByPk(id);
  if (!data) {
    res.status(404).send({
      message: `Agent with id=${id} not found`,
    });
  } else {
    res.send(data);
  }
});

// Update an agent by id
const update = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const [num] = await Agents.update(req.body, {
    where: { id: id },
  });
  if (num === 1) {
    res.send({
      message: 'Agent was updated successfully',
    });
  } else {
    res.send({
      message: `Cannot update agent with id=${id}. Agent not found or req.body is empty`,
    });
  }
});

// Delete an agent by id
const Delete = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const num = await Agents.destroy({
    where: { id: id },
  });
  if (num === 1) {
    res.send({
      message: 'Agent was deleted successfully',
    });
  } else {
    res.send({
      message: `Cannot delete agent with id=${id}. Agent not found`,
    });
  }
});

module.exports = {
  agentRegistration,
  agentLogin,
  create,
  findAll,
  findOne,
  update,
  Delete,
};
