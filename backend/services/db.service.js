const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MemberSchema = require('./schemas/member');
const BoardSchema = require('./schemas/board');

mongoose
  .connect(
    'mongodb+srv://mango:mango@koticluster.mtgal.mongodb.net/trellops?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB', err));

const BoardData = mongoose.model('boardData', BoardSchema, 'board');

const getBoards = async () => await BoardData.find();
const getBoard = async (boardId) =>
  await BoardData.findOne({ id: boardId });

const getMembers = async () => await BoardData.find({}, 'members');
const getMember = async (boardId, memberId) =>
  await BoardData.find(
    { id: boardId, 'members._id': memberId },
    { 'members.$': 1 }
  );

const getGroup = async (boardId, groupId) =>
  await BoardData.find(
    { id: boardId, 'groups.id': groupId },
    { 'groups.$': 1 }
  );
