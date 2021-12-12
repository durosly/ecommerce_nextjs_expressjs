'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert("productInventories", [{
        id: "3f17773a-e1cc-4f2c-8a29-1f79c6fdd708",
        quantity: 10,
        createdAt: Date.now(),
        updatedAt: Date.now()
    }, {
        id: "3a297635-bf19-4d0d-a735-aa5a493406d2",
        quantity: 100,
        createdAt: Date.now(),
        updatedAt: Date.now()
    }, {
        id: "4f111e88-596a-4524-b0d2-a0d96f33da38",
        quantity: 50,
        createdAt: Date.now(),
        updatedAt: Date.now()
    }, {
        id: "e717bfc8-dc1c-4ecd-b2d9-5fa71f9a8ce8",
        quantity: 5,
        createdAt: Date.now(),
        updatedAt: Date.now()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('productInventories', null, {});
  }
};
