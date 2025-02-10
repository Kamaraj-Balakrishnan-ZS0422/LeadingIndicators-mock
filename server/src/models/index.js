const sequelize = require('../config/database');
const User = require('./userModel');
const Incident = require('./incidentModel');

sequelize.sync({ force: false }) // Set to true for initial sync to recreate tables
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((err) => console.log('Error:', err));

module.exports = {
  User,
  Incident
};
