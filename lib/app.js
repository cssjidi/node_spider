var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var child_process = require('child_process');
// var index = require('./routes/index');
// var users = require('./routes/users');
// var base = require('./components/base');
var http = require('http');
var app = express();
// var debug = require('debug')('cjd-spider:server');
//var port = normalizePort(process.env.PORT || '3000');
var server = http.createServer(app);
var io = require('socket.io')(server);

function Server(conf){
	if (!(this instanceof Server)) {
	    return new Server(conf);
	}
	this.app = app;
	this.server = http.createServer(this.app);
	// this.on('listening', function() {
	// 	self.log('Listening on port \x1b[1m%s\x1b[m.', self.conf.port);
	// });
	this.init();
}

Server.prototype.init = function(){

}



// Server.prototype.listen = function(){
//   var addr = this.server.address();
//   var bind = typeof addr === 'string'
//     ? 'pipe ' + addr
//     : 'port ' + addr.port;
//   debug('Listening on ' + bind);
// }

Server.prototype.listen = function(port, hostname, func) {
  port = port || this.conf.port || 8080;
  hostname = hostname || this.conf.hostname;
  return this.server.listen(port, hostname, func);
};

exports = Server;
exports.Server = Server;
exports.createServer =  Server;
module.exports = exports;