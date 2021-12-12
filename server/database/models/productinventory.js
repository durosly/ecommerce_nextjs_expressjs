'use strict';
const {
  Model
} = require('sequelize');
const {v4: uuidv4} = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class ProductInventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ProductInventory.init({
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductInventory',
  });
  
  ProductInventory.beforeCreate((inventory, _) => {
      inventory.id = uuidv4();
      return inventory;
  });
  return ProductInventory;
};