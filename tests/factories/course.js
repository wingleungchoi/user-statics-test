import * as R from 'ramda';
import * as faker from 'faker';
import models from '../../src/models';

const courseFactory = (factory) => {
  factory.define('course', models.Course, (buildOptions = {}) => {
    return {
      id: R.propOr(faker.random.uuid(), 'id', buildOptions),
      createdAt: R.propOr(new Date(), 'createdAt', buildOptions),
      updatedAt: R.propOr(new Date(), 'updatedAt', buildOptions),
    };
  });
};

export default { courseFactory };
export { courseFactory };

module.exports = { courseFactory };
