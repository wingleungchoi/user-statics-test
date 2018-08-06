require('../../test.setup');
const moment = require('moment');
const { expect } = require('chai');

const transactionController = require('../../../src/controllers/v1/transactionController');
const { Transaction } = require('../../../src/models/transaction');

describe('TransactionController', async () => {
  describe('create', async () => {
    it('return inserted transaction and also have default values when an appropricate request body is provided', async () => {
      const bodyInObject = {
        account_id: '5b66dfd558fd6005dda6738f',
        description: 'my salary',
        amount: 10000,
        ccy: 'HKD',
        date: moment().format(),
      };
      const event = {
        body: JSON.stringify(bodyInObject),
      };
      const response = await transactionController.create(event);
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).equal(200);
      expect(responseBody.success).equal(true);
      expect(typeof responseBody.result._id).equal('string');
      expect(responseBody.result.account_id).to.equal(bodyInObject.account_id);
      expect(responseBody.result.description).to.equal(bodyInObject.description);
      expect(responseBody.result.amount).to.equal(bodyInObject.amount);
      expect(responseBody.result.ccy).to.equal(bodyInObject.ccy);
      expect(responseBody.result.date).to.equal(bodyInObject.date);
    });
  
    it('return failure when an wrong request body is provided', async () => {
    });
  
    it('return failure when account_id is not exit in DB', async () => {
    });

    it('return failure when ccy does not match with account in DB', async () => {
    });
  })
});
