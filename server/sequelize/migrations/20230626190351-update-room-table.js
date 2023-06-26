'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Rooms', 'floor', {
      allowNull: true,
      type: Sequelize.INTEGER,
    })
    await queryInterface.addColumn('Rooms', 'electricPrice', {
      allowNull: true,
      type: Sequelize.FLOAT,
    })
    await queryInterface.addColumn('Rooms', 'waterPrice', {
      allowNull: true,
      type: Sequelize.FLOAT,
    })
    await queryInterface.addColumn('Rooms', 'description', {
      allowNull: true,
      type: Sequelize.TEXT,
    })
    await queryInterface.addColumn('Rooms', 'utilities', {
      allowNull: true,
      type: Sequelize.ARRAY(Sequelize.STRING),
    })
    await queryInterface.addColumn('Rooms', 'images', {
      allowNull: true,
      type: Sequelize.ARRAY(Sequelize.STRING),
    })
    await queryInterface.changeColumn('Rooms', 'area', {
      allowNull: true,
      type: Sequelize.FLOAT,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Rooms', 'floor')
    await queryInterface.removeColumn('Rooms', 'electricPrice')
    await queryInterface.removeColumn('Rooms', 'waterPrice')
    await queryInterface.removeColumn('Rooms', 'description')
    await queryInterface.removeColumn('Rooms', 'utilities')
    await queryInterface.removeColumn('Rooms', 'images')
    await queryInterface.changeColumn('Rooms', 'area', {
      allowNull: false,
      type: Sequelize.FLOAT,
    })
  }
};
