const express = require('express');
const {
  getBoards,
  getBoard,
  addBoard,
  updateBoard,
  removeBoard,
} = require('./board.controller');

const router = express.Router();

router.get('/', getBoards);
router.get('/:id', getBoard);
router.post('/', addBoard);
router.put('/', updateBoard);
router.delete('/:id', removeBoard);

module.exports = router;
