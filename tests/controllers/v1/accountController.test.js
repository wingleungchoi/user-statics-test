require('../../test.setup');
const { expect } = require('chai');

const accountController = require('../../../src/controllers/v1/accountController');
const { Account } = require('../../../src/models/account');

describe('AccountController', async () => {
  describe('create', async () => {
    it('return inserted account and also have default values when an appropricate request body is provided', async () => {
      const bodyInObject = {
        ccy: 'HKD',
        name: 'user HKD account 1',
        user_id: '5b66dfd558fd6005dda6738f',
      };
      const event = {
        body: JSON.stringify(bodyInObject),
      };
      const response = await accountController.create(event);
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).equal(200);
      expect(responseBody.success).equal(true);
      expect(typeof responseBody.result._id).equal('string');
      expect(responseBody.result.user_id).equal(bodyInObject.user_id);
      expect(responseBody.result.ccy).equal(bodyInObject.ccy);
      expect(responseBody.result.name).equal(bodyInObject.name);
    });
  
    it('return failure when an duplicate request body is provided', async () => {
      const bodyInObject = {
        ccy: 'HKD',
        name: 'user HKD account 1',
        user_id: '5b66dfd558fd6005dda6738f',
      };
      const event = {
        body: JSON.stringify(bodyInObject),
      };
      await Account.create({
        ccy: 'HKD',
        name: 'user HKD account 1',
        user_id: '5b66dfd558fd6005dda67123',
      });
      const response = await accountController.create(event);
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).equal(404);
      expect(responseBody.success).equal(false);
      expect(responseBody.result.message).equal('E11000 duplicate key error dup key: { : "HKD", : ObjectId(\'5b66dfd558fd6005dda6738f\') }');
    });
  
    it('return failure when an wrong request body is provided', async () => {
      const bodyInObject = {
        ccy: 'NOT a ccy',
        name: 'user HKD account 1',
        user_id: '5b66dfd558fd6005dda6738f',
      };
      const event = {
        body: JSON.stringify(bodyInObject),
      };
      const response = await accountController.create(event);
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).equal(404);
      expect(responseBody.success).equal(false);
      expect(responseBody.result.message).equal('Account validation failed: ccy: `NOT a ccy` is not a valid enum value for path `ccy`.');
    });
  })
});
