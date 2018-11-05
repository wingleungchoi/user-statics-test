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

  userSession.associate = (models) => {
    // associations can be defined here
    models.userSession.belongsTo(
      models.session,
      {
        foreignKey: 'sessionId',
        as: 'session',
      },
    );
    models.userSession.belongsTo(
      models.user,
      {
        foreignKey: 'userId',
        as: 'user',
      },
    );
  };

  return userSession;
};
