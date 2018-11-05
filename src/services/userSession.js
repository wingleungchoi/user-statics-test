const R = require('ramda');

const idExist = R.pipe(R.prop('id'), R.is(String));

const create = async ({ userSessionModel }, {
  userId,
  courseId,
  sessionId,
  totalModulesStudied,
  averageScore,
  timeStudied,
}) => {
  try {
    const userSession = await userSessionModel.create({
      userId,
      courseId,
      sessionId,
      totalModulesStudied,
      averageScore,
      timeStudied,
    });
    if (idExist(userSession.dataValues)) {
      return { success: true };
    }
    return { success: false, message: 'Failed in insert user session' };
  } catch (error) {
    return { success: false };
  }
};

module.exports = {
  create,
};
