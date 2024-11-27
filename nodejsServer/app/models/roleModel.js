import { DataTypes, INTEGER }  from 'sequelize';
import sequelize from '../config/db.js';

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  vartotojo_ID: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  turnyro_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  vardas: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  pavarde: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  amzius: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  svoris: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: { min: 1, max: 999 },
  },
  grupiu_id: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
  },
  lytis: {
    type: DataTypes.ENUM('M', 'F'),
    allowNull: true,
  },
  vartotojo_tipas: {
    type: DataTypes.ENUM('Judge', 'Participant', 'Organizer'),
    allowNull: false,
  },
}, {
  tableName: 'Turnyro_Role',
  timestamps: true,
});

export default Role;