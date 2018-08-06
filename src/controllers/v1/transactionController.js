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


module.exports = {
  create,
};
