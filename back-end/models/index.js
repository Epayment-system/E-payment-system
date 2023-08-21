"use strict";
const { Model, Sequelize } = require('sequelize');




const dbConfig = require('../config/dbconfig.js');



const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  }
);


const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.Bill = require('./billModel.js')(sequelize, Sequelize);
db.Agents = require('./agentModel.js')(sequelize, Sequelize);
db.User = require('./UserModel.js')(sequelize, Sequelize);
db.ServiceProviders = require('./ServiceModel')(sequelize, Sequelize);
db.payment = require('./PaymentModel.js')(sequelize, Sequelize);
// db.AgentHistory = require('./agentHistoryModel.js')(sequelize, Sequelize);
// db.ServiceProviderHistory = require('./serviceProviderHistoryModel.js')(sequelize, Sequelize);
// db.UserHistory = require('./userHistoryModel.js')(sequelize, Sequelize);


// Define User-Agents junction table
const UserAgent = sequelize.define('userAgent', {});

// Define Agents-ServiceProvider junction table
const AgentServiceProvider = sequelize.define('agentServiceProvider', {});

// Define User-ServiceProvider junction table
const UserServiceProvider = sequelize.define('userServiceProvider', {});


// Define associations
db.User.belongsToMany(db.Agents, { through: UserAgent,
as: "Agents",
  foreignKey: "UserID"});

db.Agents.belongsToMany(db.User, { through: UserAgent, 
  as: "User",
  foreignKey: "agentBIN"});

db.Agents.belongsToMany(db.ServiceProviders, { through: AgentServiceProvider,
  as: "ServiceProviders",
  foreignKey: "agentBIN" });

/*db.ServiceProviders.belongsToMany(db.Agents, { through: AgentServiceProvider,
  as: "Agents",
  foreignKey: "serviceProviderBIN"});*/

db.User.belongsToMany(db.ServiceProviders, { through: UserServiceProvider,
  as: "ServiceProviders",
  foreignKey: "UserID"});
  
/*db.ServiceProviders.belongsToMany(db.User, { through: UserServiceProvider,
  as: "User",
  foreignKey: "serviceProviderBIN"});*/


db.Agents.hasMany(db.payment);
db.payment.belongsTo(db.Agents);

// db.AgentHistory.hasOne(db.payment);
// db.payment.belongsTo(db.AgentHistory);

db.User.hasMany(db.payment);
db.payment.belongsTo(db.User);






db.ServiceProviders.hasMany(db.payment);
db.payment.belongsTo(db.ServiceProviders);





// db.ServiceProviderHistory.hasOne(db.Payment);
// db.Payment.belongsTo(db.ServiceProviderHistory);

// db.User.hasMany(db.UserHistory);
// db.UserHistory.belongsTo(db.User);

// db.Payment.hasOne(db.UserHistory);
// db.UserHistory.belongsTo(db.Payment);





db.ServiceProviders.hasMany(db.Bill);
db.Bill.belongsTo(db.ServiceProviders);





db.payment.hasOne(db.Bill);
db.Bill.belongsTo(db.payment);

db.User.hasMany(db.Bill);
db.Bill.belongsTo(db.User);

module.exports = db;