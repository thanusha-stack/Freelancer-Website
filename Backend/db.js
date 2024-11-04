// config/database.js

const { Sequelize } = require('sequelize');

// Create a Sequelize instance and configure MySQL connection
const sequelize = new Sequelize('job_portal_db', 'your_username', 'your_password', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Set to true to see SQL queries in console
});

module.exports = sequelize;
