'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Carts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
              msg: 'Please, enter user id'
          },
          notEmpty: {
              msg: 'Please, enter user id'
          }
        }
      },
      productId: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
              msg: 'Please, enter product id'
          },
          notEmpty: {
              msg: 'Please, enter product id'
          }
        }
      },
      count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please, enter item count'
            },
            notEmpty: {
                msg: 'Please, enter item count'
            },
            isInt: {
                msg: 'Count must be an integer'
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
    await queryInterface.dropTable('Carts');
  }
};