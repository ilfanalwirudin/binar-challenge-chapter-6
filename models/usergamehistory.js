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
      userGameHistory.belongsTo(models.userGame, {
        foreignKey: "userGameId",
      });
    }
  }
  userGameHistory.init(
    {
      id: DataTypes.INTEGER,
      userGameId: DataTypes.INTEGER,
      time: DataTypes.DATE,
      score: DataTypes.ENUM,
    },
    {
      sequelize,
      modelName: "userGameHistory",
    }
  );
  return userGameHistory;
};
