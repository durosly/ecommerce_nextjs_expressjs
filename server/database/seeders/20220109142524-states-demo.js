'use strict';
const {v4: uuidv4} = require("uuid");
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
    await queryInterface.bulkInsert("States", [
      { id: uuidv4(), name: "Abia"},
      { id: uuidv4(), name: "Abuja"},
      { id: uuidv4(), name: "Adamawa"},
      { id: uuidv4(), name: "Akwa Ibom"},
      { id: uuidv4(), name: "Anambra"},
      { id: uuidv4(), name: "Bauchi"},
      { id: uuidv4(), name: "Bayelsa"},
      { id: uuidv4(), name: "Benue"},
      { id: uuidv4(), name: "Borno"},
      { id: uuidv4(), name: "Cross River"},
      { id: uuidv4(), name: "Delta"},
      { id: uuidv4(), name: "Ebonyi"},
      { id: uuidv4(), name: "Edo"},
      { id: uuidv4(), name: "Ekiti"},
      { id: uuidv4(), name: "Enugu"},
      { id: uuidv4(), name: "Gombe"},
      { id: uuidv4(), name: "Imo"},
      { id: uuidv4(), name: "Jigawa"},
      { id: uuidv4(), name: "Kaduna"},
      { id: uuidv4(), name: "Kano"},
      { id: uuidv4(), name: "Katsina"},
      { id: uuidv4(), name: "Kebbi"},
      { id: uuidv4(), name: "Kogi"},
      { id: uuidv4(), name: "Kwara"},
      { id: uuidv4(), name: "Lagos"},
      { id: uuidv4(), name: "Nasarawa"},
      { id: uuidv4(), name: "Niger"},
      { id: uuidv4(), name: "Ogun"},
      { id: uuidv4(), name: "Ondo"},
      { id: uuidv4(), name: "Osun"},
      { id: uuidv4(), name: "Oyo"},
      { id: uuidv4(), name: "Plateau"},
      { id: uuidv4(), name: "Rivers"},
      { id: uuidv4(), name: "Sokoto"},
      { id: uuidv4(), name: "Taraba"},
      { id: uuidv4(), name: "Yobe"},
      { id: uuidv4(), name: "Zamfara"}
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('States', null, {});
  }
};
