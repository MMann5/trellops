const boardRoutes = require('./api/board/board.routes');
const path = require('path');
const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const http = require('http').Server(app);
var io = require('socket.io')(http);
const corsOptions = {
  origin: 'http://localhost:2556',
  credentials: true,
};

app.use('/api/board', boardRoutes);
app.use(express.static('public'));
app.use(express.json());
app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
app.use(cors(corsOptions));
http.listen(process.env.PORT || 2556, () => {
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
