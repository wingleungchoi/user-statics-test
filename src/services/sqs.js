// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// setup credentials
new AWS.Credentials(process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY);
// Set the region
AWS.config.update({ region: 'us-east-1' });

// Create an SQS service object
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

const send = async ({ messageAttributes, messageBody }) => {
  const params = {
    DelaySeconds: 10,
    MessageAttributes: messageAttributes,
    MessageBody: messageBody,
    QueueUrl: process.env.SQS_URL,
  };
  await sqs.sendMessage(params).promise();
};

module.exports = {
  send,
};
