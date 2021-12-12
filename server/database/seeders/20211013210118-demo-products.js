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
    await queryInterface.bulkInsert("Products", [{
        id: "410c412a-3f03-4e26-9a05-e46327f729a8",
        name: "premium bag pack",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        price: 4000,
        productCategoryId: '18e2be73-deb9-480d-8dee-321de4032952',
        productInventoryId: '3f17773a-e1cc-4f2c-8a29-1f79c6fdd708',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        discount: 12,
        image: "sun-lingyan-_H0fjILH5Vw-unsplash.jpg"
    }, {
        id: "d5809d95-d9bf-49cf-aad0-235797ce67a4",
        name: "gucci tuxedo",
        desc: "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        price: 30000,
        productCategoryId: '972dbf1b-a623-468a-b4c6-5320c362fba1',
        productInventoryId: '3a297635-bf19-4d0d-a735-aa5a493406d2',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        discount: 2,
        image: "gez-xavier-mansfield-b34E1vh1tYU-unsplash.jpg"
    }, {
        id: "c727e252-9e4c-4e41-bdf8-183bfe3cfed0",
        name: "Adidias shoe",
        desc: "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        price: 30000,
        productCategoryId: '783a09d1-350f-44c7-926b-dc09fb8ec846',
        productInventoryId: '4f111e88-596a-4524-b0d2-a0d96f33da38',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        discount: 20,
        image: "ian-bevis-IJjfPInzmdk-unsplash.jpg"
    }, {
        id: "cf4de588-af05-4001-b571-c88fc87d2a4a",
        name: "Louis victon",
        desc: "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        price: 3000,
        productCategoryId: '783a09d1-350f-44c7-926b-dc09fb8ec846',
        productInventoryId: 'e717bfc8-dc1c-4ecd-b2d9-5fa71f9a8ce8',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        discount: 4,
        image: "trendest-studio-XZ3EmAIWuz0-unsplash.jpg"
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Products', null, {});
  }
};
