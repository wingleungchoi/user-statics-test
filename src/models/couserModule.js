module.exports = (sequelize, DATA_TYPES) => {
  const couserModule = sequelize.define('CouserModule', {
    id: {
      type: DATA_TYPES.UUID,
      primaryKey: true,
      defaultValue: DATA_TYPES.UUIDV4,
    },
    sessionId: {
      type: DATA_TYPES.UUID,
    },
  }, {});

  return couserModule;
};
