var socket = io();
var connectionCount = document.getElementById('connection-count');
var statusMessage = document.getElementById('status-message');
var currentVotes = document.querySelectorAll('#current-votes li');
var buttons = document.querySelectorAll('#choices button');



socket.on('usersConnected', function (count) {
  connectionCount.innerText = 'Connected Users: ' + count;
});

socket.on('statusMessage', function (message) {
  statusMessage.innerText = message;
});

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', this.innerText);
  });
}

socket.on('voteCount', function (votes) {
  let arr = Object.keys(votes)
  for(var i = 0; i < currentVotes.length; i++){
    currentVotes[i].innerText = arr[i]+ ': ' + votes[arr[i]]
  }
});
