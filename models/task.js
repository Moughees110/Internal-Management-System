const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Sequelize connection

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  summary: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  priority: {
    type: DataTypes.ENUM('Low', 'Medium', 'High'),
    allowNull: false,
  },
  assignedTo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  project: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estimate: {
    type: DataTypes.STRING,
    allowNull: true, // Example: "3h", "2d"
  },
  timeTracking: {
    type: DataTypes.STRING,
    allowNull: true, // Example: "1h 30m"
  },
  reporter: {
    type: DataTypes.ENUM('Sir Moughees Hasan Raza', 'Sir Nouman', 'Sir Akhtar'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('In Progress', 'Done'),
    allowNull: false,
    defaultValue: 'In Progress',
  },
});

module.exports = Task;
