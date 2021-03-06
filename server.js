const http = require('http');
const express = require('express');
const port = process.env.PORT || 3000;
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app).listen(port, () => {
  console.log(`Listening on port ${port}`);
});
const io = socketIo(server);
var votes = {};
function countVotes(votes) {
  var voteCount = {
    A: 0,
    B: 0,
    C: 0,
    D: 0
  };
  for (var vote in votes) {
    voteCount[votes[vote]]++
  }
  return voteCount;
}

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`)
});

io.on('connection', (socket) => {
  console.log('A user has connected.', io.engine.clientsCount);
  io.sockets.emit('usersConnected', io.engine.clientsCount);

  socket.emit('statusMessage', 'You have connected.');

  socket.on('message', (channel, message) => {
    if (channel === 'voteCast') {
      votes[socket.id] = message;
      socket.emit('voteCount', countVotes(votes));
      socket.emit('statusMessage', 'You have voted for ' + message);
    }
  });

  socket.on('disconnect', () => {
    console.log('A user has disconnected.', io.engine.clientsCount);
    delete votes[socket.id];
    socket.emit('voteCount', countVotes(votes));
    console.log(votes);
    io.sockets.emit('usersConnected', io.engine.clientsCount);
  });

});

module.exports = server;
