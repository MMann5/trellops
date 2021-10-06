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
              id: String,
              username: String,
              fullname: String,
              imgUrl: String,
            },
          ],
          labels: [{ id: String, title: String, color: String }],
          attachments: [String],
        },
      ],
    },
  ],
  activities: Array,
});

module.exports = mongoose.model('boardData', BoardSchema, 'board');
// module.exports = GroupSchema;.
