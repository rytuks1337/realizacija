import { DataTypes, UUID } from 'sequelize';
import sequelize from '../config/db.js';

const UserUUID = sequelize.define('VartotojoUUID', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  vartotojo_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  UUID: {
    type: DataTypes.STRING(36),
    allowNull: false,
  },
}, {
  tableName: 'VartotojoUUID',
  timestamps: true,
});

export default UserUUID;