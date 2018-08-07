const R = require('ramda');
const moment = require('moment');

const { Transaction } = require('../../models/transaction');
const { Account } = require('../../models/account');
const { GiniBaseError } = require('../../errors');

const create = async (event) => {
  const {
    account_id,
    description,
    amount,
    ccy,
    date,
  } = JSON.parse(event.body);
  const transaction = new Transaction({
    account_id,
    description,
    amount,
    ccy,
    date,
  });

  try {
    const account = await Account.findOne({ _id: account_id });
    if (account === null) {
      throw (new GiniBaseError('Account is not found!'));
    }
    if (account._doc.ccy !== ccy) {
      throw (new GiniBaseError('The curreny of the transaction is not matached with the account!'));
    }
    // TODO atomic transaction for insert Transaction + Account update
    const insertedTransaction = await transaction.save();
    const insertedTransactionDoc = insertedTransaction._doc;
    // 1) write operation in MONGODB is atomic
    // 2) $inc is in place update
    // #=> support concurrencies when there are many transations
    await Account.update({ _id: account._doc._id }, { $inc: { balance: amount } });
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        result: {
          ...insertedTransactionDoc,
          date: moment(insertedTransactionDoc.date).format(),
        },
      }),
    };
    return response;
  } catch (err) {
    const response = {
      statusCode: 404,
      body: JSON.stringify({
        success: false,
        result: err,
      }),
    };
    return response;
  }
};


const list = async (event) => {
  const limit = R.path(['queryStringParameters', 'limit'], event);
  const skip = R.path(['queryStringParameters', 'skip'], event);
  const account_id = R.path(['queryStringParameters', 'account_id'], event);
  const queryCondition = R.reduce((accumlator, ketValuePairs) => {
    const key = ketValuePairs[0];
    const value = ketValuePairs[1];
    const lens = R.lensProp(key);
    return value ? R.set(lens, value, accumlator) : accumlator;
  }, {}, R.toPairs({
    account_id,
  }));
  try {
    const total = await Transaction.count(queryCondition);
    const accounts = await Transaction.find(queryCondition, null, { skip, limit });
    const formattedTransactions = R.map(account => account._doc, accounts);
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        result: formattedTransactions,
        total,
      }),
    };
    return response;
  } catch (error) {
    const response = {
      statusCode: 404,
      body: JSON.stringify({
        success: false,
        result: error,
      }),
    };
    return response;
  }
};

module.exports = {
  create,
  list,
};
