const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Client = sequelize.define(
  'Client',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rate: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    frequency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('Standard', 'Premium', 'Basic'),
      allowNull: false, 
    },
  },
  {
    timestamps: true,
    tableName: 'Clients',
  }
);

module.exports = Client;
