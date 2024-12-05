import { Sequelize } from 'sequelize';
import {config } from './src/config/config';

const dbConfig = config.Development;
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: 'postgres',
    logging: console.log, // Logs SQL queries in the console
  }
);

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Call the test connection function
testConnection();

export default sequelize;
