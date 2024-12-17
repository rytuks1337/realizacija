import { DataTypes }  from 'sequelize';
import sequelize from '../config/db.js';

const PlayerTable = sequelize.define('PlayerTable', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  roles_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  grupes_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  laimejimai: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  pralaimejimai: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'DalyvisTurnyrineLentele',
  timestamps: true,
});

export default PlayerTable;