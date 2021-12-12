'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class index_product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  index_product.init({
    title_id: DataTypes.STRING,
    product_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'index_product',
  });
  return index_product;
};