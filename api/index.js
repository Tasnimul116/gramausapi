// api/index.js
const { createServer, proxy } = require('aws-serverless-express');
const app = require('../dist/app').default;

let server;

function getServer() {
  if (!server) {
    server = createServer(app);
  }
  return server;
}

module.exports = (req, res) => {
  const server = getServer();
  return proxy(server, req, res);
};