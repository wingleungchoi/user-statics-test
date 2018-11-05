const Sequelize = require('sequelize');
const user = require('./user');
const course = require('./course');
const session = require('./session');
const couserModule = require('./couserModule');
const userSession = require('./userSession');
const config = require('../../config/config.json')[process.env.NODE_ENV || 'development'];

const sequelize = (config.use_env_variable)
  ? new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(config.database, config.username, config.password, config);
const DATA_TYPES = Sequelize;

const db = {
  sequelize,
  Sequelize,
  User: user(sequelize, DATA_TYPES),
  Course: course(sequelize, DATA_TYPES),
  Session: session(sequelize, DATA_TYPES),
  CouserModule: couserModule(sequelize, DATA_TYPES),
  UserSession: userSession(sequelize, DATA_TYPES),
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = {
  db,
};
