// api/index.js
const { createServer } = require('aws-serverless-express');
const app = require('../dist/server').default;

let server;

function getServer() {
  if (!server) {
    server = createServer(app);
  }
  return server;
}

module.exports = (req, res) => {
  return getServer()(req, res);
};