const R = require('ramda');
const faker = require('faker');
const models = require('../../src/models');

const sessionFactory = (factory) => {
  factory.define('session', models.Session, (buildOptions = {}) => {
    return {
      id: R.propOr(faker.random.uuid(), 'id', buildOptions),
      courseId: R.prop('courseId', buildOptions),
      createdAt: R.propOr(new Date(), 'createdAt', buildOptions),
      updatedAt: R.propOr(new Date(), 'updatedAt', buildOptions),
    };
  });
};

module.exports = { sessionFactory };
