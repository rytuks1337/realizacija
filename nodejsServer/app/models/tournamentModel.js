import { DataTypes }  from 'sequelize';
import sequelize from '../config/db.js';

const tournament = sequelize.define('Turnyras', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status: {
    type: DataTypes.ENUM('INIT', 'SETUP', 'REGISTER', 'START', 'IN_PROCCESS', 'FINISHED'),
    allowNull: false,
  },
  pavadinimas: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  pradzia: {
    type: DataTypes.TIME,
    allowNull: false,
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
  organizatoriausVartotojo_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  var_pogrupiai_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'Turnyras',
  timestamps: true,
});

export default tournament;