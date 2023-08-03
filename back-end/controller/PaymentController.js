const asyncHandler = require('express-async-handler');
const db = require('../models');

const Payment = db.payment;

// Create and save a new bill
exports.create = asyncHandler(async (req, res) => {
  // Validate request
  if (!req.body.paymentID  || !req.body.paymentDate  ||!req.body.status || !req.body.amount   || !req.body.referenceNumber) {
    res.status(400).send({
      message: 'Amount and description cannot be empty',
    });
    return;
  }

  // Create a bill object
  const payment = {
    paymentID : req.body.paymentID  ,
    paymentDate: req.body.paymentDate,
    status: req.body.status,
    amount  : req.body.amount,
    referenceNumber : req.body.referenceNumber 

  };

  // Save bill in the database
  const data = await Payment.create(payment);
  res.send(data);
});

// Retrieve all bills from the database
exports.findAll = asyncHandler(async (req, res) => {
  const data = await Payment.findAll();
  res.send(data);
});

// Find a single serviceprovider  by id
exports.findOne = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const data = await Payment.findByPk(id);
  if (!data) {
    res.status(404).send({
      message: (`Bill with id=${id} not found`),
    });
  } else {
    res.send(data);
  }
});

// Update a bill by id
exports.update = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const [num] = await Payment.update(req.body, {
    where: { id: id },
  });

  if (num === 1) {
    res.send({
      message: 'Bill was updated successfully.',
    });
  } else {
    res.send({
      message: (`Cannot update bill with id=${id}. Bill not found or req.body is empty!`),
    });
  }
});

// Delete a bill by id
exports.delete = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const num = await Payment.destroy({
    where: { id: id },
  });

  if (num === 1) {
    res.send({
      message: 'Bill was deleted successfully!',
    });
  } else {
    res.send({
      message: (`Cannot delete bill with id=${id}. Bill not found!`),
    });
  }
});