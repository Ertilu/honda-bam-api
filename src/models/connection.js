// @ts-nocheck
const mongoose = require('mongoose');
const config = require('../config/config');

function makeNewConnection(uri, name) {
  const db = mongoose.createConnection(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => null
  );

  db.on('error', (error) => {
    console.error(`MongoDB :: connection ${name} ${JSON.stringify(error)}`);
    db.close().catch(() => {
      console.error(`MongoDB :: failed to close connection ${name}`);
    });
  });

  db.on('connected', () => {
    console.info(`MongoDB :: connected ${name}`);
  });

  db.on('disconnected', () => {
    console.info(`MongoDB :: disconnected ${name}`);
  });

  return db;
}

const mainConnection = makeNewConnection(config.mongoose.url, 'mainConnection');
const imageConnection = makeNewConnection(config.mongooseImage.url, 'imageConnection');

if (!mainConnection || !imageConnection) {
  process.exit(1);
}

module.exports = {
  mainConnection,
  imageConnection,
};
