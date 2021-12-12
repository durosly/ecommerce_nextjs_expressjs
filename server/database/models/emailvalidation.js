'use strict';
const {
  Model
} = require('sequelize');
const {v4: uuidv4} = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class EmailValidation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  EmailValidation.init({
    email: DataTypes.STRING,
    token: DataTypes.STRING,
    valid: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'EmailValidation',
  });
    EmailValidation.beforeCreate((email, _) => {
        return email.token = uuidv4();
    });
  return EmailValidation;
};