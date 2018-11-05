export default (sequelize, DATA_TYPES) => {
  const user = sequelize.define('User', {
    id: {
      type: DATA_TYPES.UUID,
      primaryKey: true,
      defaultValue: DATA_TYPES.UUIDV4,
    },
  }, {});

  return user;
};
