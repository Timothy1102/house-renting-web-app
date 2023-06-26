'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({House}) {
      // define association here
      this.belongsTo(House, {foreignKey: 'houseId'}); // a house can have many rooms
    }
  }
  Room.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    price: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    floor: {
        allowNull: true,
        type: DataTypes.INTEGER,
    },
    area: {
        allowNull: true,
        type: DataTypes.FLOAT,
    },
    electricPrice: {
        allowNull: true,
        type: DataTypes.FLOAT,
    },
    waterPrice: {
        allowNull: true,
        type: DataTypes.FLOAT,
    },
    description: {
        allowNull: true,
        type: DataTypes.TEXT,
    },
    utilities: {
        allowNull: true,
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
    },
    images: {
        allowNull: true,
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
    },
    houseId: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};