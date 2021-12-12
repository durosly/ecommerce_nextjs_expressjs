'use strict';
const {
  Model
} = require('sequelize');
const {v4: uuidv4} = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.ProductCategory)
      this.belongsTo(models.ProductInventory)
    }
  };
  Product.init({
    name: DataTypes.STRING,
    desc: DataTypes.STRING,
    price: DataTypes.STRING,
    discount: DataTypes.INTEGER,
    image: DataTypes.STRING,
    productCategoryId: DataTypes.STRING,
    productInventoryId: DataTypes.STRING,
    vendorId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });

  Product.beforeCreate((product, _) => {
    product.id = uuidv4();
    return product;
});

  return Product;
};