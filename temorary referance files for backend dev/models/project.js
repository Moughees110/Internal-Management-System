const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Project = sequelize.define(
  'Project',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    client: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    attachment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: 'Projects',
  }
);

module.exports = Project; 


 