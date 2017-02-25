const
  db = require('databaseConnection');

const scheme = {
  exclude: ['password', 'active', '@pk', '@fk', '@auto']
};

module.exports = scheme
