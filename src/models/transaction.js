const mongoose = require('mongoose');

const { GINI } = require('../../src/constants');

const { Schema } = mongoose;

const TransactionSchema = new Schema({
  account_id: { type: Schema.Types.ObjectId, required: true },
  description: { type: String, default: '' },
  amount: { type: Number, required: true, default: 0 },
  ccy: { type: String, required: true, enum: GINI.CURRENCIES },
  date: { type: Date, required: true },
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports.Transaction = Transaction;
