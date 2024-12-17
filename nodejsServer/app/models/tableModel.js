import { DataTypes}  from 'sequelize';
import sequelize from '../config/db.js';

const Stalas = sequelize.define('Stalai', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nr: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dabartinisLenkimoGrupesID: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  lenkimo_id: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
  },
  turnyro_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  teiseju_id:{
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
  }
}, {
  tableName: 'Stalai',
  timestamps: true,
});

export default Stalas;