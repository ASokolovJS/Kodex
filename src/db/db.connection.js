const { Sequelize } = require('sequelize');
const db = require('./db.config');

const sequelize = new Sequelize(
  db.database,
  db.username,
  db.password,
  db.options
)

module.exports = sequelize