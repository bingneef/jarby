'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'users',
      'firstName',
      Sequelize.STRING
    )

    queryInterface.addColumn(
      'users',
      'lastName',
      Sequelize.STRING
    )

    queryInterface.addColumn(
      'users',
      'active',
      Sequelize.BOOLEAN
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'users',
      'firstName',
      Sequelize.STRING
    )

    queryInterface.removeColumn(
      'users',
      'lastName',
      Sequelize.STRING
    )

    queryInterface.removeColumn(
      'users',
      'active',
      Sequelize.BOOLEAN
    )
  }
};
