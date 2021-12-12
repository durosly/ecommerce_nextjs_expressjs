'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProductInventories', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please, specify a quantity'
            },
            notEmpty: {
                msg: 'Please, specify a quantity'
            },
            isInt: {
                msg: 'Quantity should be an integer'
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
    await queryInterface.dropTable('ProductInventories');
  }
};