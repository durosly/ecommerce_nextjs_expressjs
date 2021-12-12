'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please, enter firstname'
            },
            notEmpty: {
                msg: 'Please, enter firstname'
            }
        }
      },
      middlename: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please, enter lastname'
            },
            notEmpty: {
                msg: 'Please, enter lastname'
            }
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        notNull: true,
        notEmpty: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        notNull: true,
        notEmpty: true
      },
      phonenumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      state: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      isBanned: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      date_of_birth: {
        type: Sequelize.DATE
      },
      gender: {
        type: Sequelize.ENUM("male", "female")
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};