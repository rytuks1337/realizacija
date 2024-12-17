import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Match = sequelize.define('lenkimoSesija', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  dalyvio_ID: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  dalyvio2_ID: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  laimetojoDalyvio_ID: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  pralaimetoDalyvio_ID: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  teisejai_ID: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
  },
  grupes_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  round:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('CREATED', 'IN_PROCCESS', 'FINISHED'),
    allowNull: false,
  },

}, {
  tableName: 'Lenkimo_sesija',
  timestamps: true,
});

export default Match;