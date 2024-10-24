const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const Group = sequelize.define('pogrupis', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  pavadinimas: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  svoris: { 
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amzius_k: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 0, max: 128 },
  },
  lytis: {
    type: DataTypes.ENUM('M', 'F'),
    allowNull: false,
  },
  ranka: {
    type: DataTypes.ENUM('K', 'D'),
    allowNull: false,
  },
  vartotojo_ID: { // match ID
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  varzybos_ID: { // match ID
    type: DataTypes.INTEGER,
    allowNull: false,
  },

}, {
  tableName: 'Pogrupis',
  timestamps: true,
});

module.exports = Group;