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
