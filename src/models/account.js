const mongoose = require('mongoose');

const { GINI } = require('../../src/constants');

const { Schema } = mongoose;

const AccountSchema = new Schema({
  ccy: { type: String, required: true, enum: GINI.CURRENCIES },
  balance: { type: Number, required: true, default: 0 },
  name: { type: String, required: true },
  user_id: { type: Schema.Types.ObjectId, required: true },
});

// Indexes
AccountSchema.index({ ccy: 1, user_id: 1 }, { unique: true });

const Account = mongoose.model('Account', AccountSchema);

module.exports.Account = Account;
