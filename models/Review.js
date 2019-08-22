const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema({
  imdbID: {
    type: String,
    required: true
  },
  videoTitle: {
    type: String,
    required: true
  },
  stars: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  username: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Review', ReviewSchema);
