const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const Match = sequelize.define('lenkimoSesija', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  dalyvio_ID: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  dalyvio2_ID: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  laimetojoDalyvio_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  teisejas_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  teisejas2_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  varzybu_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pogrupis_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

}, {
  tableName: 'Lenkimo_sesija',
  timestamps: true,
});

module.exports = Match;