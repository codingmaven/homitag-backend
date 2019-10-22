console.log('API starting up');
const db = require('./config/database'); // open db as soon as possible
require('dotenv').config();
// const config = require('edgecommonconfig');

require('./app/models');

const port = process.env.PORT || 3000;

console.log(`API listening for HTTP on port ${port}`);
const httpServer = require('./app/app').listen(port);

function shutdown() {
  console.log('\nAPI shutting down');
  httpServer.close();
  db.connection.close().then(() => {
    console.log('Shutdown completed');
    return process.exit(0);
  }).catch(function(err) {
    console.log(err);
  });
}

process.on('unhandledRejection', error => {
  console.warn('unhandledRejection');
  console.error(error);
  process.exit(1);
});

process.on('uncaughtException', error => {
  console.warn('uncaughtException');
  console.error(error);
  process.exit(1);
});

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
