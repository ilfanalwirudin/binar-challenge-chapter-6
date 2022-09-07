"use strict";

const { DataRowMessage } = require("pg-protocol/dist/messages");

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
      "userGameHistories",
      [
        {
          id: 1,
          userGameId: 1,
          time: new Date(),
          score: "WIN",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      "userGameHistories",
      [
        {
          id: 2,
          userGameId: 2,
          time: new Date(),
          score: "DRAW",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      "userGameHistories",
      [
        {
          id: 3,
          userGameId: 3,
          time: new Date(),
          score: "LOSE",
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
    await queryInterface.bulkDelete("userGameHistories", null, {});
  },
};
