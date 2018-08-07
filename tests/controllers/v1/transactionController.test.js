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
      const account = await Account.create({
        ccy: 'HKD',
        name: 'user HKD account 1',
        user_id: '5b5dd20c241c680ff5b8b609',
        balance: 0,
      });

      const bodyInObject = {
        account_id: account._id,
        description: 'my salary',
        amount: 'one thousand',
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
      expect(response.statusCode).equal(404);
      expect(responseBody.success).equal(false);
      expect(responseBody.result.message).equal('Transaction validation failed: amount: Cast to Number failed for value "one thousand" at path "amount"');
    });
  
    it('return failure when account_id is not exit in DB', async () => {
      const absentId = '5b5dd1bc4e2cb20fd1823a68';
      const bodyInObject = {
        account_id: absentId,
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
      expect(response.statusCode).equal(404);
      expect(responseBody.success).equal(false);
      expect(responseBody.result.message).equal('Account is not found!');
    });

    it('return failure when ccy does not match with account in DB', async () => {
      const account = await Account.create({
        ccy: 'HKD',
        name: 'user HKD account 1',
        user_id: '5b5dd27c93e2901046996713',
        balance: 0,
      });

      const bodyInObject = {
        account_id: account._id,
        description: 'my salary',
        amount: 10000,
        ccy: 'USD',
        date: moment().format(),
      };
      const event = {
        body: JSON.stringify(bodyInObject),
      };
      const response = await transactionController.create(event);
      const updatedAccount = await Account.findOne({ _id: account._id });
      const updatedAccountDoc = updatedAccount._doc;
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).equal(404);
      expect(responseBody.success).equal(false);
      expect(responseBody.result.message).equal('The curreny of the transaction is not matached with the account!');
    });
  });

  describe('list', async () => {
    it('returns all accounts', async () => {
      await Account.remove({});
      await Transaction.remove({});
      const account = await Account.create({
        ccy: 'HKD',
        name: 'user HKD account 1',
        user_id: '5b6722bf78c9e50e50041ffa',
      });
      const transaction = await Transaction.create({
        account_id: account._doc._id,
        description: 'my salary',
        amount: 10000,
        ccy: 'HKD',
        date: moment().format(),
      });

      const response = await transactionController.list({});
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).equal(200);
      expect(responseBody.success).equal(true);
      expect(responseBody.result.length).equal(1);
      expect(responseBody.total).equal(1);
      expect(responseBody.result[0]._id).equal(transaction._doc._id.toString());
    });

    it('supports pagination', async () => {
      const event = {
        queryStringParameters: {
          limit: 10,
          skip: 1,
        },
      };
      await Account.remove({});
      await Transaction.remove({});
      const account = await Account.create({
        ccy: 'HKD',
        name: 'user HKD account 1',
        user_id: '5b6722bf78c9e50e50041ffa',
      });
      const transaction = await Transaction.create({
        account_id: account._doc._id,
        description: 'my salary',
        amount: 10000,
        ccy: 'HKD',
        date: moment().format(),
      });

      const account2 = await Account.create({
        ccy: 'HKD',
        name: 'user HKD account 1',
        user_id: '5b671e429436622812a41ede',
      });
      const transaction2 = await Transaction.create({
        account_id: account2._doc._id,
        description: 'my salary',
        amount: 10000,
        ccy: 'HKD',
        date: moment().format(),
      });
      const response = await transactionController.list(event);
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).equal(200);
      expect(responseBody.success).equal(true);
      expect(responseBody.total).equal(2);
      expect(responseBody.result.length).equal(1);
      expect(responseBody.result[0]._id).equal(transaction2._doc._id.toString());
    });

    it('supports query by account_id', async () => {
      await Account.remove({});
      await Transaction.remove({});
      const account = await Account.create({
        ccy: 'HKD',
        name: 'user HKD account 1',
        user_id: '5b6722bf78c9e50e50041ffa',
      });
      const transaction = await Transaction.create({
        account_id: account._doc._id,
        description: 'my salary',
        amount: 10000,
        ccy: 'HKD',
        date: moment().format(),
      });
      
      const account2 = await Account.create({
        ccy: 'HKD',
        name: 'user HKD account 1',
        user_id: '5b671e429436622812a41ede',
      });
      const transaction2 = await Transaction.create({
        account_id: account2._doc._id,
        description: 'my salary',
        amount: 10000,
        ccy: 'HKD',
        date: moment().format(),
      });
      const event = {
        queryStringParameters: {
          account_id: account2._doc._id.toString(),
        },
      };
      const response = await transactionController.list(event);
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).equal(200);
      expect(responseBody.success).equal(true);
      expect(responseBody.total).equal(1);
      expect(responseBody.result.length).equal(1);
      expect(responseBody.result[0]._id).equal(transaction2._doc._id.toString());
    });
  });
});
