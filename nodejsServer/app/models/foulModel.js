import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Foul = sequelize.define('prazangos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  dalyvio_ID: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  lenkimo_ID: { // match ID
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  prazangos_tipas: {
    type: DataTypes.ENUM('Elbow', 'Hand', 'FStart'),
    allowNull: false,
  },

}, {
  tableName: 'Prazangos',
  timestamps: true,
});

export default Foul;