const Sequelize = require("sequelize");
const sequelize = require("../db/db.connection")
const songs = require('../models/songsModel')

const Singers = sequelize.define("singer", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING, 
    allowNull: false,
    validate: {
      notIn: [[
        'Монеточка',
        "Mонеточка",
        "Мoнеточка",
        "Монеточкa", 
        "Монeточка"]],
    }
  },
  date: {
    type: Sequelize.DATEONLY,
  },
});

Singers.hasMany(songs, {onDelete:'CASCADE'})

module.exports = Singers
