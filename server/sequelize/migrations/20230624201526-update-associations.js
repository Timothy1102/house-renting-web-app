'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Rooms', 'houseId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Houses',
        key: 'id',
      },
      onDelete: 'CASCADE', // Update the onDelete property
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Rooms', 'houseId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Houses',
        key: 'id',
      },
      onDelete: 'SET NULL', // Update the onDelete property
    });
  }
};
