require('../../test.setup');
const moment = require('moment');
const { expect } = require('chai');

const transactionController = require('../../../src/controllers/v1/transactionController');
const { Transaction } = require('../../../src/models/transaction');
const { Account } = require('../../../src/models/account');

describe('TransactionController', async () => {
  describe('create', async () => {
    it('return inserted transaction and update account.balance when an appropricate request body is provided', async () => {
      const account = await Account.create({
        ccy: 'HKD',
        name: 'user HKD account 1',
        user_id: '5b6723f03c1a88179a9bda9c',
        balance: 0,
      });

      const bodyInObject = {
        account_id: account._id,
        description: 'my salary',
        amount: 10000,
        ccy: 'HKD',
        date: moment().format(),
      };
      const event = {
        body: JSON.stringify(bodyInObject),
      };
      const response = await transactionController.create(event);
      const updatedAccount = await Account.findOne({ _id: account._id });
      const updatedAccountDoc = updatedAccount._doc;
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).equal(200);
      expect(responseBody.success).equal(true);
      expect(typeof responseBody.result._id).equal('string');
      expect(responseBody.result.account_id).to.equal(bodyInObject.account_id.toString());
      expect(responseBody.result.description).to.equal(bodyInObject.description);
      expect(responseBody.result.amount).to.equal(bodyInObject.amount);
      expect(responseBody.result.ccy).to.equal(bodyInObject.ccy);
      expect(responseBody.result.date).to.equal(bodyInObject.date);
      expect(updatedAccountDoc.balance).to.equal(account.balance + bodyInObject.amount);
    });
  
    it('return failure when an wrong request body is provided', async () => {
    });
  
    it('return failure when account_id is not exit in DB', async () => {
    });

    it('return failure when ccy does not match with account in DB', async () => {
    });
  })
});
