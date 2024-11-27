import { DataTypes }  from 'sequelize';
import sequelize from '../config/db.js';

const Tournament = sequelize.define('Turnyras', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status: {
    type: DataTypes.ENUM('INIT', 'SETUP', 'REGISTER', 'IN_PROCCESS', 'FINISHED'),
    allowNull: false,
  },
  pavadinimas: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  data: {
    type: 'TIMESTAMP',
    allowNull: false,
  },
  tvarka: {
    type: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.STRING(50))),
    allowNull: true,
  },
  pabaiga: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  lokacija: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  stalu_sk: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 128 },
  },
  aprasas: {
    type: DataTypes.STRING(4096),
    allowNull: true,
  },
}, {
  tableName: 'Turnyras',
  timestamps: true,
});

export default Tournament;