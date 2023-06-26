'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Houses', 'images', {
      allowNull: true,
      type: Sequelize.ARRAY(Sequelize.STRING),
    })
    await queryInterface.removeColumn('Houses', 'numberOfRooms')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Houses', 'images')
    await queryInterface.addColumn('Houses', 'numberOfRooms', {
      allowNull: false,
      type: Sequelize.INTEGER,
    })
  }
};
