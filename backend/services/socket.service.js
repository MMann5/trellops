'use strict';

const express = require('express');

const init = (app, io) => {
  io.on('connection', (socket) => {
    socket.on('move-applicant', (payload) => {
      socket.broadcast.emit('move-applicant', payload);
    });
    socket.on('set-bg', (payload) => {
      socket.broadcast.emit('set-bg', payload);
    });
  });
  app.use(express.static('client'));
};

module.exports = init;
