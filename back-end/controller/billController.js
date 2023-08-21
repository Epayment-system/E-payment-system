const asyncHandler = require('express-async-handler');
const db = require('../models');

const Bill = db.Bill;

// Create and save a new bill
exports.create = asyncHandler(async (req, res) => {
  // Validate request
  const requiredFields = [
    'billNumber',
    'dateIssued',
    'dueDate',
    'amountDue',
    'customerName',
    'serviceDescription',
    'serviceCharges',
    'billStatus'
  ];

  const missingFields = requiredFields.filter(field => !req.body[field]);

  if (missingFields.length > 0) {
    res.status(400).send({
      message: `${missingFields.join(', ')} cannot be empty`,
    });
    return;
  }

  const totalAmount = calculateTotalAmount(req.body);

  const bill = {
    billNumber: req.body.billNumber,
    dateIssued: req.body.dateIssued,
    dueDate: req.body.dueDate,
    amountDue: parseFloat(req.body.amountDue),
    customerName: req.body.customerName,
    serviceDescription: req.body.serviceDescription,
    serviceCharges: parseFloat(req.body.serviceCharges),
    billStatus: req.body.billStatus,
    additionalCharges: parseFloat(req.body.additionalCharges || 0),
    servicePeriod: req.body.servicePeriod,
    totalAmount: totalAmount
  };

  const data = await Bill.create(bill);
  res.send(data);
});

// Retrieve all bills from the database
exports.findAll = asyncHandler(async (req, res) => {
  const data = await Bill.findAll();
  res.send(data);
});

// Find a single bill by id
exports.findOne = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const data = await Bill.findByPk(id);
  if (!data) {
    res.status(404).send({
      message: `Bill with id=${id} not found`,
    });
  } else {
    res.send(data);
  }
});

// Update a bill by id
exports.update = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const existingBill = await Bill.findByPk(id);

  if (!existingBill) {
    res.status(404).send({
      message: `Bill with id=${id} not found`,
    });
    return;
  }

  updateBillFields(existingBill, req.body);

  const totalAmount = calculateTotalAmount(existingBill);

  existingBill.totalAmount = totalAmount;

  await existingBill.save();

  res.send({
    message: 'Bill was updated successfully.',
  });
});

// Delete a bill by id
exports.delete = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const num = await Bill.destroy({
    where: { id: id },
  });

  if (num === 1) {
    res.send({
      message: 'Bill was deleted successfully!',
    });
  } else {
    res.send({
      message: `Cannot delete bill with id=${id}. Bill not found!`,
    });
  }
});

// Helper function to calculate the total amount
function calculateTotalAmount(bill) {
  const serviceCharges = parseFloat(bill.serviceCharges);
  const amountDue = parseFloat(bill.amountDue);
  const additionalCharges = parseFloat(bill.additionalCharges || 0);

  return serviceCharges + amountDue + additionalCharges;
}

// Helper function to update the bill fields
function updateBillFields(bill, updateData) {
  const fieldsToUpdate = [
    'billNumber',
    'dateIssued',
    'dueDate',
    'amountDue',
    'customerName',
    'serviceDescription',
    'serviceCharges',
    'billStatus',
    'additionalCharges',
    'servicePeriod'
  ];

  fieldsToUpdate.forEach(field => {
    bill[field] = updateData[field] || bill[field];
  });
}