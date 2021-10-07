const boardRoutes = require('./api/board/board.routes');
const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').createServer(app);
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
