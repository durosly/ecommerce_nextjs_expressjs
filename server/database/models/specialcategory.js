'use strict';
const {
  Model
} = require('sequelize');
const {v4: uuidv4} = require("uuid"); 
module.exports = (sequelize, DataTypes) => {
  class SpecialCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  SpecialCategory.init({
    title: DataTypes.STRING,
    type: DataTypes.ENUM,
    from: DataTypes.INTEGER,
    to: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SpecialCategory',
  });

  SpecialCategory.beforeCreate((s_category, _) => {
    s_category.id = uuidv4();
    return s_category;
  });

  return SpecialCategory;
};