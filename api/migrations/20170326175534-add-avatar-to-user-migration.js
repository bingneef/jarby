'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'users',
      'avatarUrl',
      Sequelize.STRING
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'users',
      'avatarUrl',
      Sequelize.STRING
    )
  }
};
