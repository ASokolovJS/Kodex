const Sequelize = require('sequelize')
const sequelize = require('../db/db.connection')

const Songs = sequelize.define('songs', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: true
  },
  date: {
    type: Sequelize.DATEONLY,
  }
})

module.exports = Songs