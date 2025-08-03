// api/index.js
module.exports = (req, res) => {
  res.statusCode = 200;
  res.json({ message: 'Hello from Vercel!' });
};