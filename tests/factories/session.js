import * as R from 'ramda';
import * as faker from 'faker';
import models from '../../src/models';

const sessionFactory = (factory) => {
  factory.define('sesssion', models.Session, (buildOptions = {}) => {
    return {
      id: R.propOr(faker.random.uuid(), 'id', buildOptions),
      courseId: R.prop('courseId', buildOptions),
      createdAt: R.propOr(new Date(), 'createdAt', buildOptions),
      updatedAt: R.propOr(new Date(), 'updatedAt', buildOptions),
    };
  });
};

export default { sessionFactory };
export { sessionFactory };

module.exports = { sessionFactory };
