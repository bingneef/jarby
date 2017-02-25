Sequelize = require('sequelize');
dbCredentials = require('./config/dbConfig');

sequelize = new Sequelize(dbCredentials.database, dbCredentials.username, dbCredentials.password,
  {
    host: 'localhost',
    dialect: dbCredentials.dialect,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    }
  });

sequelize
  .authenticate()
  .then( () => {
    console.log('Connection with database established');
  })
  .catch( (err) => {
    console.log('Error connecting to the database: ' + err);
  });

module.exports = sequelize
