const boardRoutes = require('./api/board/board.routes');
const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').Server(app);
var io = require('socket.io')(http);
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(express.json());
app.use(cors(corsOptions));
app.use('/api/board', boardRoutes);
http.listen(2556, () => {
  console.log('connected');
});

io.on('connection', (socket) => {
  console.log('HELLO');
  socket.on('move-applicant', (payload) => {
    socket.broadcast.emit('move-applicant', payload);
  });
  socket.on('set-bg', (payload) => {
    socket.broadcast.emit('set-bg', payload);
  });
});
