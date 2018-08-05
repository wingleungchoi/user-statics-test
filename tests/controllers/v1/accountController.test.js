require('../../test.setup');
const { expect } = require('chai');

const accountController = require('../../../src/controllers/v1/accountController');

describe('insertInternalTickets', async () => {
  it('return results of internalTickets and also have default values when an appropricate request body is provided', async () => {
    const bodyInObject = {
      ccy: 'HKD',
      name: 'user HKD account 1',
      user_id: '5b66dfd558fd6005dda6738f',
    };
    const event = {
      body: JSON.stringify(bodyInObject),
    };
    const response = await accountController.create(event);
    const responseBody = JSON.parse(response.body);
    expect(response.statusCode).equal(200);
    expect(responseBody.success).equal(true);
    expect(typeof responseBody.result._id).equal('string');
    expect(responseBody.result.user_id).equal(bodyInObject.user_id);
    expect(responseBody.result.ccy).equal(bodyInObject.ccy);
    expect(responseBody.result.name).equal(bodyInObject.name);
  });
});
