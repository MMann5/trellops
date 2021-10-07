'use strict';

const express = require('express');

const init = (app, io) => {
  // socket logic
  io.on('connection', (socket) => {
    // move applicant to another list/index
    socket.on('move-applicant', (payload) => {
      socket.broadcast.emit('move-applicant', payload);
    });
    socket.on('set-bg', (payload) => {
      socket.broadcast.emit('set-bg', payload);
    });
  });

  // serve static files
  app.use(express.static('client'));
};

module.exports = init;
