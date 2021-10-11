const mongoose = require('mongoose');
const BoardSchema = new mongoose.Schema({
  _id: String,
  title: String,
  createdAt: Number,
  createdBy: Object,
  style: { bgColor: String },
  labels: Array,
  members: Array,
  groups: [
    {
      id: String,
      title: String,
      tasks: [
        {
          id: String,
          title: String,
          description: String,
          dueDate: Number,
          bgColor: String,
          comments: [
            {
              id: String,
              txt: String,
              createdAt: Number,
              byMember: {
                _id: String,
                fullname: String,
                imgUrl: String,
              },
            },
          ],
          members: [
            {
              _id: String,
              fullname: String,
              imgUrl: String,
              avatarColor: String,
            },
          ],
          labels: [{ id: String, title: String, color: String }],
          checklists: [
            { id: String, title: String, checked: Boolean },
          ],
          attachments: [String],
        },
      ],
    },
  ],
  activities: [
    {
      _id: String,
      actionType: String,
      createdAt: Number,
      taskOrGroup: { title: String },
      byMember: { _id: String, fullname: String, imgUrl: String },
      txt: String
    },
  ],
});

module.exports = mongoose.model('boardData', BoardSchema, 'board');
// module.exports = GroupSchema;.
