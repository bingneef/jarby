const
  db = require('databaseConnection');

const scheme = {
  exclude: ['@pk', '@fk', '@auto']
};

module.exports = scheme
