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
    await queryInterface.bulkInsert("productCategories", [{
        id: "18e2be73-deb9-480d-8dee-321de4032952",
        name: "Bags",
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        createdAt: Date.now(),
        updatedAt: Date.now()
    }, {
        id: "972dbf1b-a623-468a-b4c6-5320c362fba1",
        name: "Shirts",
        desc: 'Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
        createdAt: Date.now(),
        updatedAt: Date.now()
    }, {
        id: "783a09d1-350f-44c7-926b-dc09fb8ec846",
        name: "Shoes",
        desc: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
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
     await queryInterface.bulkDelete('productCategories', null, {});
  }
};
