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
     * }], {});
     */
    await queryInterface.bulkInsert(
      "userBiodatas",
      [
        {
          id: 1,
          userGameId: 1,
          DOB: new Date(),
          POB: "Surga",
          city: "Jakarta",
          gender: "Prefer Not Say",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          userGameId: 2,
          DOB: new Date(),
          POB: "Komputer",
          city: "Jakarta",
          gender: "Male",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          userGameId: 3,
          DOB: new Date(),
          POB: "Brebes",
          city: "Bogor",
          gender: "Male",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("userGameBiodatas", null, {});
  },
};
