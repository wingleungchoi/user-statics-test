const R = require('ramda');
const faker = require('faker');
const models = require('../../src/models');

const courseFactory = (factory) => {
  factory.define('course', models.Course, (buildOptions = {}) => {
    return {
      id: R.propOr(faker.random.uuid(), 'id', buildOptions),
      createdAt: R.propOr(new Date(), 'createdAt', buildOptions),
      updatedAt: R.propOr(new Date(), 'updatedAt', buildOptions),
    };
  });
};

module.exports = { courseFactory };
