'use strict';
const {
  Model
} = require('sequelize');
const {v4: uuidv4} = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class DeliveryFee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  DeliveryFee.init({
    productId: DataTypes.STRING,
    price: DataTypes.INTEGER,
    state: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DeliveryFee',
  });

  DeliveryFee.beforeCreate((fee, _) => {
    fee.id = uuidv4();
    return fee;
  });

  return DeliveryFee;
};