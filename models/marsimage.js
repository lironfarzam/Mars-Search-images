'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MarsImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  MarsImage.init({
    url: DataTypes.STRING,
    email: DataTypes.STRING,
    imageId: DataTypes.STRING,
    date: DataTypes.STRING,
    sol: DataTypes.STRING,
    mission: DataTypes.STRING,
    camera: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MarsImage',
  });
  return MarsImage;
};