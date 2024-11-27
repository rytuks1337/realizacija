import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('Vartotojas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  vardas: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  pavarde: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  amzius: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  svoris: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: { min: 1, max: 999 },
  },
  el_pastas: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  slaptazodis: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lytis: {
    type: DataTypes.ENUM('M', 'F'),
    allowNull: false,
  },
}, {
  tableName: 'Vartotojas',
  timestamps: true,
});

export default User;