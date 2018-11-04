'use strict';
module.exports = (sequelize, DataTypes) => {
  const UsersSessions = sequelize.define('UsersSessions', {
    id: DataTypes.UUID
  }, {});
  UsersSessions.associate = function(models) {
    // associations can be defined here
  };
  return UsersSessions;
};