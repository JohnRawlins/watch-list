const mongoose = require('mongoose');

const VideoSchema = mongoose.Schema({
  imdbID: {
    type: String,
    required: true
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String,
    required: true
  },
  year: String,

  poster: String,

  type: String
});

module.exports = mongoose.model('Video', VideoSchema);
