var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.use(express.static(path.join(__dirname, '/bower_components')));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/app')));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/app/index.html')
});

var usernames = {};

io.on('connection', function(socket){
  console.log('a user connected id: %s', socket.id);

  socket.on('add user', function (username) {

    socket.username = username;

    usernames[socket.id] = username;

    socket.broadcast.emit('user joined', {
      username: socket.username
    });

  });

  socket.on('send msg', function(msj){
    io.emit('get msg', msj.msg, socket.username, msj.avatar); 
  });

});


// Start server
var port = 7000;
http.listen(port, function () {
  console.log('Express server listening on port %s', port);
});