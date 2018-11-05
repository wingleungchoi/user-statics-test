module.exports = (sequelize, DATA_TYPES) => {
  const course = sequelize.define('Course', {
    id: {
      type: DATA_TYPES.UUID,
      primaryKey: true,
      defaultValue: DATA_TYPES.UUIDV4,
    },
  }, {});

  return course;
};
