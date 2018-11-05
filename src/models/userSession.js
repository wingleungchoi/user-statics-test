module.exports = (sequelize, DATA_TYPES) => {
  const userSession = sequelize.define('UserSession', {
    id: {
      type: DATA_TYPES.UUID,
      primaryKey: true,
      defaultValue: DATA_TYPES.UUIDV4,
    },
    sessionId: {
      type: DATA_TYPES.UUID,
    },
    userId: {
      type: DATA_TYPES.UUID,
    },
    totalModulesStudied: {
      type: DATA_TYPES.UUID,
      defaultValue: 0,
    },
    averageScore: {
      type: DATA_TYPES.DECIMAL,
    },
    timeStudied: {
      type: DATA_TYPES.DECIMAL,
      defaultValue: 0,
    },
  }, {});

  return userSession;
};
