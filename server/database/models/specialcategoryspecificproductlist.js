'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpecialCategorySpecificProductList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  SpecialCategorySpecificProductList.init({
    SpecialCategoryId: DataTypes.STRING,
    ProductId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SpecialCategorySpecificProductList',
  });

  SpecialCategorySpecificProductList.beforeCreate((s_category_list, _) => {
    s_category_list.id = uuidv4();
    return s_category_list;
  });

  return SpecialCategorySpecificProductList;
};