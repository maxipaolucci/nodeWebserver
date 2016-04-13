'use strict';

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var subSocket = require('./lib/subscribe');
var badges = require('./models/badges')

server.listen(3000, function  () {
    console.log('Server is running on port %d', 3000);
});

/**
 * Serve static assets out of public. This is a middleware.
 */
app.use(express.static('public'));

/**
 * this is not neccesary due that the middleware before make the same task. We just type it to ensure that index.html gonna be
 * back to the user and understood where that happens. But we can delete this route
 */
app.get('/', function (req, res) {
    res.sendfile('./public/index.html');
});

io.sockets.on('connection', function(socket) {
    badges.get(function (err, data) {
        if (err) return;
        data.forEach(function (badge) {
            socket.emit('badge', badge);
        });
    });
});

subSocket.on('message', function (message) {
    io.sockets.emit('badge', message);
});