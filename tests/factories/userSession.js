import * as R from 'ramda';
import * as faker from 'faker';
import models from '../../src/models';

const userSessionFactory = (factory) => {
  factory.define('userSession', models.Session, (buildOptions = {}) => {
    return {
      id: R.propOr(faker.random.uuid(), 'id', buildOptions),
      sesssionId: R.prop('sesssionId', buildOptions),
      userId: R.prop('userId', buildOptions),
      createdAt: R.propOr(new Date(), 'createdAt', buildOptions),
      updatedAt: R.propOr(new Date(), 'updatedAt', buildOptions),
    };
  });
};

export default { userSessionFactory };
export { userSessionFactory };

module.exports = { userSessionFactory };
