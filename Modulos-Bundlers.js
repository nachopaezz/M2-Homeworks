// APP.JS: ARCHIVO DE ENTRADA

var whiteboard = require('./whiteboard.js');
var io = require('socket.io-client.js');
var socket = io(window.location.origin);


// var whiteboard = window.whiteboard;   // Require ./whiteboard
// var socket = window.io(window.location.origin);   // Viene de una dependencia que ya instalamos
                                                      // Con determinar que vaya a buscar require 'socket.io-client'


// import {whiteboard} from './whiteboard';
// import io from 'socket.io.client';       ---------->   De otra forma.
  socket.on('connect', function () {
    console.log('Connected!');
  });

  socket.on('load', function (strokes) {

    strokes.forEach(function (stroke) {
      var start = stroke.start;
      var end = stroke.end;
      var color = stroke.color;
      whiteboard.draw(start, end, color, false);
    });

  });

  socket.on('draw', function (start, end, color) {
    whiteboard.draw(start, end, color, false);
  });

  whiteboard.on('draw', function (start, end, color) {
    socket.emit('draw', start, end, color);
  });

