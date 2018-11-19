var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server, { origins: '*:*'});

server.listen(80);

app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {

});