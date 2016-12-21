const http = require('http');
const express = require('express');
const port = process.env.PORT || 3000;

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`)
})

const server = http.createServer(app).listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = server;
