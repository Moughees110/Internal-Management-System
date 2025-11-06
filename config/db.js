 

const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    
    process.env.DB_NAME,    // Database Name
    process.env.DB_USER,    // Database User
    process.env.DB_PASS,    // Database Password
    {
        host: process.env.DB_HOST,    // Database Host
        dialect: 'mysql',
        logging: false,  // Disable logging in console
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

// Test Connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log(' Connection to MySQL has been  successfully.');
    } catch (error) {
        console.error(' Unable to connect to the database:', error);
    }
})();

module.exports = sequelize;


