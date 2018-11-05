export default (sequelize, DATA_TYPES) => {
  const session = sequelize.define('Session', {
    id: {
      type: DATA_TYPES.UUID,
      primaryKey: true,
      defaultValue: DATA_TYPES.UUIDV4,
    },
    courseId: {
      type: DATA_TYPES.UUID,
    },
  }, {});

  return session;
};
