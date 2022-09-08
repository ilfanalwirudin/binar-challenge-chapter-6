"use strict";
const { forEachRight } = require("lodash");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class userBiodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      userBiodata.belongsTo(models.userGame, {
        foreignKey: "userGameId",
      });
    }
  }
  userBiodata.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userGameId: DataTypes.INTEGER,
      DOB: DataTypes.DATEONLY,
      POB: DataTypes.STRING,
      city: DataTypes.STRING,
      gender: DataTypes.ENUM("Male", "Female", "Prefer Not Say"),
    },
    {
      sequelize,
      modelName: "userBiodata",
      tableName: "userBiodatas",
    }
  );
  return userBiodata;
};
