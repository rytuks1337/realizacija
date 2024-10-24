const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const tournamentRole = sequelize.define('Turnyro_Role', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  vartotojo_ID: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  vartotojo_tipas: {
    type:  DataTypes.ENUM('Judge', 'Participant', 'Organizer'),
    allowNull: false,
  },
  turnyro_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 0, max: 128 },
  },
}, {
  tableName: 'Turnyro_Role',
  timestamps: true,
});

module.exports = tournamentRole;