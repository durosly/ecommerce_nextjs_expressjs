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
    await queryInterface.bulkInsert("Admins", [{
        username: "admin9090",
        password: "$2a$10$TxVOnlSw931Mu/bWdXxsPuGMwuNSLOZmJO38dXvb.nvWUZnfbYQae",
        avatar: "avatar.png",
        isSuper: true
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Admins', null, {});
  }
};
