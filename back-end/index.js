

// Import necessary packages and modules

const express = require("express");
const app = express();
const db = require("./models");

// Call the sync() method on the Sequelize instance to synchronize the database schema with the Sequelize models
db.sequelize.sync().then(() => {
  // Start the server once the database has been synced successfully
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
