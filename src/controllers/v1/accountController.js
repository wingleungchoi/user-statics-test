const { Account } = require('../../models/account');

const create = async (event) => {
  const {
    ccy,
    name,
    user_id,
  } = JSON.parse(event.body);
  const account = new Account({
    ccy,
    name,
    user_id,
  });

  try {
    const insertedAccount = await account.save();
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        result: insertedAccount._doc,
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
};
