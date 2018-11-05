import * as R from 'ramda';
import * as faker from 'faker';
import models from '../../src/models';

const userFactory = (factory) => {
  factory.define('user', models.User, (buildOptions = {}) => {
    return {
      id: R.propOr(faker.random.uuid(), 'id', buildOptions),
      createdAt: R.propOr(new Date(), 'createdAt', buildOptions),
      updatedAt: R.propOr(new Date(), 'updatedAt', buildOptions),
    };
  });
};

export default { userFactory };
export { userFactory };

module.exports = { userFactory };
