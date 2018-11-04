'use strict';
module.exports = (sequelize, DataTypes) => {
  const Module = sequelize.define('Module', {
    id: DataTypes.UUID
  }, {});
  Module.associate = function(models) {
    // associations can be defined here
  };
  return Module;
};