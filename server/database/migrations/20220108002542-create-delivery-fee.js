'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DeliveryFees', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      productId: {
        type: Sequelize.STRING,
        validate: {
          notNull: {
              msg: 'Please, enter product id'
          },
          notEmpty: {
              msg: 'Please, enter product id'
          }
        }
      },
      price: {
        type: Sequelize.INTEGER,
        validate: {
          notNull: {
              msg: 'Please, enter user id'
          },
          notEmpty: {
              msg: 'Please, enter user id'
          },
          isInt: {
            msg: "Price must be an integer"
          }
        }
      },
      state: {
        type: Sequelize.STRING,
        validate: {
          notNull: {
              msg: 'Please, enter user id'
          },
          notEmpty: {
              msg: 'Please, enter user id'
          }
        }
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
    await queryInterface.dropTable('DeliveryFees');
  }
};