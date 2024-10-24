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
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 0, max: 128 },
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