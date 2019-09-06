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
  Title: {
    type: String,
    required: true
  },
  Year: String,

  Poster: String,

  Type: String
});

module.exports = mongoose.model('Video', VideoSchema);
