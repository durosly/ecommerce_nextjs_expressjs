'use strict';
const {
  Model
} = require('sequelize');
const {v4: uuidv4} = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Order.init({
    trxref: DataTypes.STRING,
    userId: DataTypes.STRING,
    channel: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    productId: DataTypes.STRING,
    state: DataTypes.STRING,
    address: DataTypes.STRING,
    price: DataTypes.INTEGER,
    deliveryfee: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });

  Order.beforeCreate((order, _) => {
    order.id = uuidv4();
    return order;
  });

  return Order;
};