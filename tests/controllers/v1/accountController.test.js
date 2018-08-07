require('../../test.setup');
const { expect } = require('chai');

const accountController = require('../../../src/controllers/v1/accountController');
const { Account } = require('../../../src/models/account');

describe('AccountController', async () => {
  describe('create', async () => {
    it('returns inserted account and also have default values when an appropricate request body is provided', async () => {
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
  
    it('returns failure when an duplicate request body is provided', async () => {
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
        user_id: '5b686c29c297fb740ed0d193',
      });
      const response = await accountController.create(event);
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).equal(404);
      expect(responseBody.success).equal(false);
      expect(responseBody.result.message).equal('E11000 duplicate key error dup key: { : "HKD", : ObjectId(\'5b66dfd558fd6005dda6738f\') }');
    });
  
    it('returns failure when an wrong request body is provided', async () => {
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
  });

  describe('list', async () => {
    it('returns all accounts', async () => {
      await Account.remove({});
      const account = await Account.create({
        ccy: 'HKD',
        name: 'user HKD account 1',
        user_id: '5b6722bf78c9e50e50041ffa',
      });
      const response = await accountController.list({});
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).equal(200);
      expect(responseBody.success).equal(true);
      expect(responseBody.result.length).equal(1);
      expect(responseBody.total).equal(1);
      expect(responseBody.result[0]._id).equal(account._doc._id.toString());
    });

    it('supports pagination', async () => {
      const event = {
        queryStringParameters: {
          limit: 10,
          skip: 1,
        },
      };
      await Account.remove({});
      const account = await Account.create({
        ccy: 'HKD',
        name: 'user HKD account 1',
        user_id: '5b6722bf78c9e50e50041ffa',
      });
      const account2 = await Account.create({
        ccy: 'HKD',
        name: 'user HKD account 1',
        user_id: '5b671e429436622812a41ede',
      });
      const response = await accountController.list(event);
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).equal(200);
      expect(responseBody.success).equal(true);
      expect(responseBody.total).equal(2);
      expect(responseBody.result.length).equal(1);
      expect(responseBody.result[0]._id).equal(account2._doc._id.toString());
    });
  });
});
