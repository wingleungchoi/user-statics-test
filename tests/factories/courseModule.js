import * as R from 'ramda';
import * as faker from 'faker';
import models from '../../src/models';

const courseModuleFactory = (factory) => {
  factory.define('courseModule', models.Session, (buildOptions = {}) => {
    return {
      id: R.propOr(faker.random.uuid(), 'id', buildOptions),
      sesssionId: R.prop('sesssionId', buildOptions),
      createdAt: R.propOr(new Date(), 'createdAt', buildOptions),
      updatedAt: R.propOr(new Date(), 'updatedAt', buildOptions),
    };
  });
};

export default { courseModuleFactory };
export { courseModuleFactory };

module.exports = { courseModuleFactory };
