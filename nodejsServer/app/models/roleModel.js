import { DataTypes }  from 'sequelize';
import sequelize from '../config/db.js';

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  vartotojo_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  vartotojo_tipas: {
    type: DataTypes.ENUM('Judge', 'Participant', 'Organizer'),
    allowNull: false,
  },
  turnyro_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'Turnyro_Role',
  timestamps: true,
});

export default Role;