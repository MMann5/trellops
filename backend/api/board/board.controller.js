const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BoardModel = require('../../schemas/board');
const config = require('../../config/dev.js');

mongoose
  .connect(config.dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB', err));

const getBoards = async (req, res) => {
  const boards = await BoardModel.find({});
  res.json(boards);
};
const getBoard = async (req, res) => {
  const board = await BoardModel.findById(req.params.id);
  res.json(board);
};

const addBoard = async (req, res) => {
  let newBoard = new BoardModel();
  newBoard._id = mongoose.Types.ObjectId();
  newBoard.title = req.body.txt;
  newBoard.createdAt = Date.now();
  newBoard.style.bgColor = req.body.bgColor;
  newBoard.groups = [];
  newBoard.createdBy = {};
  newBoard.activities = [];
  newBoard.members = [
    {
      _id: 'u101',
      fullname: 'Tal Tarablus',
      imgUrl: 'tal.jpg',
      avatarColor: '#EEA29A',
    },
    {
      _id: 'u102',
      fullname: 'Michael Mann',
      imgUrl: 'michael.png',
      avatarColor: '#04AA6D',
    },
    {
      _id: 'u103',
      fullname: 'Ron Shmuel Kotigaro',
      imgUrl: 'ron.png',
      avatarColor: '#3E4444',
    },
    {
      _id: 'u104',
      fullname: 'David Ben Ishai',
      imgUrl: 'david.jpg',
      avatarColor: '#6B5B95',
    },
  ];
  newBoard.labels = [
    {
      id: 'l101',
      title: 'Done',
      color: '#7BC86C',
    },
    {
      id: 'l102',
      title: 'In Progress',
      color: '#61bd',
    },
    {
      id: 'l103',
      title: 'Important',
      color: '#F5DD29',
    },
    {
      id: 'l104',
      title: 'Optional',
      color: '#d4f',
    },
    {
      id: 'l105',
      title: 'Complex',
      color: '#FFAF3F',
    },
  ];
  await newBoard.save((err, newBoard) =>
    err ? res.send(err) : res.json(newBoard)
  );
};

const updateBoard = (req, res) => {
  const { body } = req;
      BoardModel.findByIdAndUpdate(body._id, body, (err, user) => {
        if (err) {
            return res
                .status(500)
                .send({error: "unsuccessful"})
        };
        res.send({success: "success"});
    });
};

const removeBoard = (req, res) => {
  BoardModel.findByIdAndRemove(req.params.id, function (err, board) {
    res.json(board);
  });
};

module.exports = {
  getBoards,
  getBoard,
  addBoard,
  updateBoard,
  removeBoard,
};
