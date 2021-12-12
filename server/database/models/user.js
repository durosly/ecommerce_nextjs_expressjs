'use strict';
const {
  Model
} = require('sequelize');
const {v4: uuidv4} = require("uuid");
const bcrypt = require("bcryptjs")
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        // define association here
        }
    };
    User.init({
        firstname: DataTypes.STRING,
        middlename: DataTypes.STRING,
        lastname: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        phonenumber: DataTypes.STRING,
        state: DataTypes.STRING,
        city: DataTypes.STRING,
        address: DataTypes.STRING,
        isBanned: DataTypes.BOOLEAN,
        date_of_birth: DataTypes.DATE,
        gender: DataTypes.ENUM("male", "female")
    }, {
        sequelize,
        modelName: 'User',
    });

    User.beforeCreate((user, _) => {
        user.id = uuidv4();
        user.password = bcrypt.hashSync(user.password, 10);
        return user;
    });

    return User;
};