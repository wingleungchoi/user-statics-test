'use strict';
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    id: DataTypes.UUID
  }, {});
  Course.associate = function(models) {
    // associations can be defined here
  };
  return Course;
};