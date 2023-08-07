const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const Bill = sequelize.define('bill', {
    billNumber:{
      type: DataTypes.STRING,
      allowNUll:false,
      //primarykey: true,
  },

  dateIssued:{
      type: DataTypes.STRING,
      allowNUll:false
  },

  dueDate:{
      type: DataTypes.STRING,
      allowNUll:false
  },

  amountDue:{
      type: DataTypes.STRING,
      allowNUll:false
  },

  customerName:{
      type: DataTypes.STRING,
      allowNUll:false
  },


  serviceDescription:{
      type: DataTypes.STRING,
      allowNUll:false
  },

  serviceCharges: {
      type: DataTypes.STRING,
      allowNull: false
  },
  billStatus: {
    type: DataTypes.STRING,
    allowNull: false
},
TotalAmount: {
  type: DataTypes.STRING,
  allowNull: false
},
additionalCharges: {
  type: DataTypes.STRING,
  allowNull: false
},
servicePeriod: {
  type: DataTypes.STRING,
  allowNull: false
},

  });
  return Bill;
};