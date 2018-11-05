const R = require('ramda');
const { factory } = require('../factories');
const Models = require ('../../src/models');
const userSessionService = require('../../src/services/userSession');
const chai = require('chai');

const { expect } = 'chai';


describe('userSessionService', async () => {
  beforeEach(async () => {
    // clean up factory mock data
  });

  describe('create', async () => {
    it('should return success is true when it succeeds', async () => {
      const user = await factory.create('user');
      const course = await factory.create('course');
      const session = await factory.create('session', {}, { courseId: course.id });
      const result = await userSessionService.create({
        user: user.id,
        course: course.id,
        sessionId: session.id,
        totalModulesStudied: 2,
        averageScore: 10.1,
        timeStudied: 10.1,
      });
      expect(result.success).to.equal(true);
    });

    it('should return failure when the session does not exist', async () => {
    });
  });
});
