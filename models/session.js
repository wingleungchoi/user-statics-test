'use strict';
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    id: DataTypes.UUID
  }, {});
  Session.associate = function(models) {
    // associations can be defined here
  };
  return Session;
};