"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class userGameHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // userGameHistory.belongsTo(models.userGame, {
      //   foreignKey: "userGameId",
      // });
    }
  }
  userGameHistory.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      userGameId: DataTypes.INTEGER,
      time: DataTypes.DATE,
      score: DataTypes.ENUM("WIN", "LOSE", "DRAW"),
    },
    {
      sequelize,
      modelName: "userGameHistory",
      tableName: "userGameHistories",
    }
  );
  return userGameHistory;
};