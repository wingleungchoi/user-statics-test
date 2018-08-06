const mongoose = require('mongoose');

// 1 = connected; reference: http://mongoosejs.com/docs/api.html#connection_Connection-readyState
if (mongoose.connection.readyState !== 1 && process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
}

const AccountController = require('./src/controllers/v1/accountController');
const TransactionController = require('./src/controllers/v1/transactionController');

module.exports.listTransactions = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify([
      {
        id: 1,
      },
      {
        id: 2,
      },
    ]),
  };

  callback(null, response);
};

module.exports.insertAccount = AccountController.create;
module.exports.insertTransaction = TransactionController.create;
