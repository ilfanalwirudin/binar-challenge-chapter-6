"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * 
    
  
  }], {});
    */
    await queryInterface.bulkInsert("userGames", [
      {
        id: 1,
        username: "admin",
        password: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        username: "player",
        password: "pL4Y3r",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        username: "ilfan",
        password: "ilfanalwirudin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("userGames", null, {});
  },
};
