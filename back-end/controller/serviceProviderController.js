const asyncHandler = require('express-async-handler');
const db = require('../models');

const ServiceProviders = db.ServiceProviders;

// Create and save a new service provider
exports.create = asyncHandler(async (req, res) => {
  // Validate request

  if (!req.body. serviceProviderBIN || !req.body. serviceProviderName||
     !req.body. serviceProviderEmail || !req.body. serviceProviderPassword || 
     !req.body.servicesOffered || !req.body.BankName
     || !req.body. BankAccountNumber|| !req.body.phoneNumber 
      || !req.body. serviceProviderAuthorizationLetter ) {
    res.status(400).send({
      message: (' serviceProviderBIN,  serviceProviderName,  serviceProviderEmail, serviceProviderPassword, servicesOffered and phoneNumber cannot be empty'),
    });
    return;
  }

  // Create an agent object
  const services = {
    serviceProviderBIN: req.body. serviceProviderBIN,
    serviceProviderName: req.body. serviceProviderName,
    serviceProviderEmail: req.body. serviceProviderEmail,
    serviceProviderPassword: req.body. serviceProviderPassword,
    servicesOffered: req.body.servicesOffered,
    BankName: req.body. BankName,
    BankAccountNumber: req.body.BankAccountNumber,
    phoneNumber: req.body.phoneNumber,
    serviceProviderAuthorizationLetter: req.body. serviceProviderAuthorizationLetter
  };
 /* if (!req.body.Services_id || !req.body.Services_name || !req.body.Services_description || !req.body.Services_contact ) {
    res.status(400).send({
      message: ('Services_id, Services_name, Services_description, and Services_contact cannot be empty'),
    });
    return;
  }

  // Create a services object
  const services = {
    Services_id: req.body.Services_id,
    Services_name: req.body.Services_name,
    Services_description: req.body.Services_description,
    Services_contact: req.body.Services_contact
  };*/

  // Save services in the database
  const data = await ServiceProviders.create(services);
  res.send(data);
});

// Retrieve all services from the database
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
      message: (`ServiceProviders with id=${id} not found`),
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
      message: (`Cannot update ServiceProviders with id=${id}. ServiceProviders not found or req.body is empty!`),
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
      message: (`Cannot delete ServiceProviders with id=${id}. ServiceProviders not found!`),
    });
  }
});