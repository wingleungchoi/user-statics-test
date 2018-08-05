const mongoose = require('mongoose');
const MongodbMemoryServer = require('mongodb-memory-server').default;

const mongod = new MongodbMemoryServer();

// Create connection to Mongoose before tests are run
before(async () => {
  const uri = await mongod.getConnectionString();
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(uri, { useNewUrlParser: true });
  }
}, 10000);

after(() => {
  mongoose.disconnect();
  mongod.stop();
}, 10000);
