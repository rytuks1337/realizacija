import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Group = sequelize.define('pogrupis', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  turnyro_ID: { // Tournament ID
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pavadinimas: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  svoris: { 
    type: DataTypes.STRING(4),
    allowNull: false,
  },
  amzius: {
    type: DataTypes.STRING(4),
    allowNull: true,
  },
  lytis: {
    type: DataTypes.ENUM('M', 'F'),
    allowNull: false,
  },
  ranka: {
    type: DataTypes.ENUM('K', 'D'),
    allowNull: false,
  },


  lenkimo_tvarka: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
  }, 
  bracket:{
    type: DataTypes.JSONB,
    allowNull: true,
  },
  raundas:{
    type: DataTypes.INTEGER,
    allowNull: true,
  }

}, {
  tableName: 'Pogrupis',
  timestamps: true,
});

export default Group;