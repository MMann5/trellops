const express = require('express');
const {
  getBoards,
  getBoard,
  addBoard,
  updateBoard,
  removeBoard,
} = require('./board.controller');

const router = express.Router();
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:2556');
  next();
});
router.get('/', getBoards);
router.get('/:id', getBoard);
router.post('/', addBoard);
router.put('/', updateBoard);
router.delete('/:id', removeBoard);

module.exports = router;
