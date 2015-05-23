// requires
var express = require('express'), 
		io = require('socket.io');

// setup application
var app = express();
var server = require('http').createServer(app);
var socket = io.listen(server);

// configure app
app.use('/static', express.static(require('path').join(__dirname, '/static')));

// setup template engine
app.set('views', require('path').join(__dirname, '/views'));
app.set('view engine', 'jade');

// setup routes
app.get('/', function(req, res) {
	res.render('index');
});

app.use(function(req, res, next) {
	res.status(404).send('404 Not Found. Sorry.');
});

// configure socket
socket.sockets.on('connection', function(sock) {
	sock.on('mensaje', function(message) {
		console.log('Mensaje recibido: ', message);
		socket.sockets.emit('mensaje', message);
	});
});

// start listening
server.listen(8888);