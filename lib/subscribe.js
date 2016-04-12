/**
 * Created by mpaoluc on 11/04/16.
 */

'use strict';

var axon = require('axon');
var socket = axon.socket('sub');

socket.connect(8001);

socket.on('error', function (err) {
    throw err;
});

module.exports = socket;