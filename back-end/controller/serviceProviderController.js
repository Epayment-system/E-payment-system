const asyncHandler = require('express-async-handler');
const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const ServiceProviders = db.ServiceProviders;
const asyncHandler = require('express-async-handler');
const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const ServiceProviders = db.ServiceProviders;

// Create and save a new service provider
exports.create = asyncHandler(async (req, res) => {
  // Validate request

  if (
    !req.body.serviceProviderBIN ||
    !req.body.serviceProviderName ||
    !req.body.serviceProviderEmail ||
    !req.body.serviceProviderPassword ||
    !req.body.servicesOffered ||
    !req.body.BankName ||
    !req.body.BankAccountNumber ||
    !req.body.phoneNumber ||
    !req.body.serviceProviderAuthorizationLetter
  ) {
    res.status(400).send({
      message:
        'serviceProviderBIN, serviceProviderName, serviceProviderEmail, serviceProviderPassword, servicesOffered, BankName, BankAccountNumber, phoneNumber, and serviceProviderAuthorizationLetter cannot be empty',
    });
    return; 
  }
  //Check if user already exists
  const existingServiceProvider= await ServiceProviders.findOne({
    where: {
      serviceProviderEmail: req.body.serviceProviderEmail,
    },
  });

  if (existingServiceProvider) {
    res.status(409).send({
      message: 'Service provider already exists',
    });
    return;
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(req.body.serviceProviderPassword, 10);
  // Create a service provider object
  const services = {
    serviceProviderBIN: req.body.serviceProviderBIN,
    serviceProviderName: req.body.serviceProviderName,
    serviceProviderEmail: req.body.serviceProviderEmail,
    serviceProviderPassword:hashedPassword,
    servicesOffered: req.body.servicesOffered,
    BankName: req.body.BankName,
    BankAccountNumber: req.body.BankAccountNumber,
    phoneNumber: req.body.phoneNumber,
    serviceProviderAuthorizationLetter: req.body.serviceProviderAuthorizationLetter,
  };

  // Save service provider in the database
  const data = await ServiceProviders.create(services);
  res.send(data);
});

// Retrieve all service providers from the database
exports.findAll = asyncHandler(async (req, res) => {
  const data = await ServiceProviders.findAll();
  res.send(data);
});

// Find a single service provider by id
exports.findOne = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const data = await ServiceProviders.findByPk(id);
  if (!data) {
    res.status(404).send({
      message: `ServiceProviders with id=${id} not found`,
    });
  } else {
    res.send(data);
  }
});

// Update a service provider by id
exports.update = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const [num] = await ServiceProviders.update(req.body, {
    where: { id: id },
  });

  if (num === 1) {
    res.send({
      message: 'ServiceProviders was updated successfully.',
    });
  } else {
    res.send({
      message: `Cannot update ServiceProviders with id=${id}. ServiceProviders not found or req.body is empty!`,
    });
  }
});

// Delete a service provider by id
exports.delete = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const num = await ServiceProviders.destroy({
    where: { id: id },
  });

  if (num === 1) {
    res.send({
      message: 'ServiceProviders was deleted successfully!',
    });
  } else {
    res.send({
      message: `Cannot delete ServiceProviders with id=${id}. ServiceProviders not found!`,
    });
  }
});

// Service provider login auth
exports.login = asyncHandler(async (req, res) => {
  try {
    const { serviceProviderEmail, serviceProviderPassword } = req.body;
    const serviceProvider = await ServiceProviders.findOne({
      where: { serviceProviderEmail },
    });

    if (!serviceProvider) {
      res.status(404).json({ error: 'Service provider not found' });
    } else {
      const passwordMatch = await bcrypt.compare(
        serviceProviderPassword,
        serviceProvider.serviceProviderPassword
      );

      if (!passwordMatch) {
        res.status(401).json({ error: 'Incorrect password' });
      } else {
        const token = jwt.sign(
          { serviceProviderBIN: serviceProvider.id },
          process.env.TOKEN_SECRET,
          {
            expiresIn: '1h',
          }
        );
        res.status(200).json({ message: 'Login successful', token });
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to login service provider', message: error.message });
  }
});
// Create and save a new service provider
exports.create = asyncHandler(async (req, res) => {
  // Validate request

  if (
    !req.body.serviceProviderBIN ||
    !req.body.serviceProviderName ||
    !req.body.serviceProviderEmail ||
    !req.body.serviceProviderPassword ||
    !req.body.servicesOffered ||
    !req.body.BankName ||
    !req.body.BankAccountNumber ||
    !req.body.phoneNumber ||
    !req.body.serviceProviderAuthorizationLetter
  ) {
    res.status(400).send({
      message:
        'serviceProviderBIN, serviceProviderName, serviceProviderEmail, serviceProviderPassword, servicesOffered, BankName, BankAccountNumber, phoneNumber, and serviceProviderAuthorizationLetter cannot be empty',
    });
    return; 
  }
  //Check if user already exists
  const existingServiceProvider= await ServiceProviders.findOne({
    where: {
      serviceProviderEmail: req.body.serviceProviderEmail,
    },
  });

  if (existingServiceProvider) {
    res.status(409).send({
      message: 'Service provider already exists',
    });
    return;
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(req.body.serviceProviderPassword, 10);
  // Create a service provider object
  const services = {
    serviceProviderBIN: req.body.serviceProviderBIN,
    serviceProviderName: req.body.serviceProviderName,
    serviceProviderEmail: req.body.serviceProviderEmail,
    serviceProviderPassword:hashedPassword,
    servicesOffered: req.body.servicesOffered,
    BankName: req.body.BankName,
    BankAccountNumber: req.body.BankAccountNumber,
    phoneNumber: req.body.phoneNumber,
    serviceProviderAuthorizationLetter: req.body.serviceProviderAuthorizationLetter,
  };

  // Save service provider in the database
  const data = await ServiceProviders.create(services);
  res.send(data);
});

// Retrieve all service providers from the database
exports.findAll = asyncHandler(async (req, res) => {
  const data = await ServiceProviders.findAll();
  res.send(data);
});

// Find a single service provider by id
exports.findOne = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const data = await ServiceProviders.findByPk(id);
  if (!data) {
    res.status(404).send({
      message: `ServiceProviders with id=${id} not found`,
    });
  } else {
    res.send(data);
  }
});

// Update a service provider by id
exports.update = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const [num] = await ServiceProviders.update(req.body, {
    where: { id: id },
  });

  if (num === 1) {
    res.send({
      message: 'ServiceProviders was updated successfully.',
    });
  } else {
    res.send({
      message: `Cannot update ServiceProviders with id=${id}. ServiceProviders not found or req.body is empty!`,
    });
  }
});

// Delete a service provider by id
exports.delete = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const num = await ServiceProviders.destroy({
    where: { id: id },
  });

  if (num === 1) {
    res.send({
      message: 'ServiceProviders was deleted successfully!',
    });
  } else {
    res.send({
      message: `Cannot delete ServiceProviders with id=${id}. ServiceProviders not found!`,
    });
  }
});

// Service provider login auth
exports.login = asyncHandler(async (req, res) => {
  try {
    const { serviceProviderEmail, serviceProviderPassword } = req.body;
    const serviceProvider = await ServiceProviders.findOne({
      where: { serviceProviderEmail },
    });

    if (!serviceProvider) {
      res.status(404).json({ error: 'Service provider not found' });
    } else {
      const passwordMatch = await bcrypt.compare(
        serviceProviderPassword,
        serviceProvider.serviceProviderPassword
      );

      if (!passwordMatch) {
        res.status(401).json({ error: 'Incorrect password' });
      } else {
        const token = jwt.sign(
          { serviceProviderBIN: serviceProvider.id },
          process.env.TOKEN_SECRET,
          {
            expiresIn: '1h',
          }
        );
        res.status(200).json({ message: 'Login successful', token });
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to login service provider', message: error.message });
  }
});
