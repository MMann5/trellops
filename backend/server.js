const express = require('express');
const boardRoutes = require('./api/board/board.routes');
const app = express();
const http = require('http').createServer(app);
app.use(express.json());
app.use('/api/board', boardRoutes);
http.listen(2556, () => {
  console.log('connected');
});
