'use strict';
const {
  Model
} = require('sequelize');
const {v4: uuidv4} = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Cart.init({
    userId: DataTypes.STRING,
    productId: DataTypes.STRING,
    count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });

  Cart.beforeCreate((cart, _) => {
    cart.id = uuidv4();
    return cart;
  });

  return Cart;
};