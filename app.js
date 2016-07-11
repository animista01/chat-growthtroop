var http = require('http');
var server = http.createServer();
var io = require('socket.io')(server);
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'toor',
  database : 'growthtroop_development'
});
connection.connect(function(err){
	if(err){
        console.error('error connecting: ' + err.stack);
        return;
    }
});


io.on('connection', function (socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function (msg){
  	io.emit('chat message', msg);
  });
  socket.broadcast.emit('hi');
});

server.listen(3000, function (){
  console.log('listening at %s:%d', server.address().address, server.address().port);
});