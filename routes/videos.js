const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Video = require('../models/Video');

// @route     GET api/videos
// @desc      Retrieve user's watch list
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const videos = await Video.find({ userID: req.user.id }).select('-__v');
    return res.json({ videos });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      msg:
        'The server was unable to process your request due to an internal error'
    });
  }
});

//@route    POST api/videos
//desc      Add video to user's watch list
//@access   Private
router.post(
  '/',
  [
    auth,
    [
      check('Title', 'A video title is required')
        .not()
        .isEmpty(),
      check('imdbID', 'A video ID is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { imdbID, Title, Year, Poster, Type } = req.body;

    try {
      const videoToAdd = new Video({
        imdbID,
        userID: req.user.id,
        Title,
        Year,
        Poster,
        Type
      });

      const duplicateVideo = await Video.findOne({
        imdbID,
        userID: req.user.id
      });

      if (duplicateVideo)
        return res
          .status(400)
          .json({ msg: `${Title} is already on your watch list` });

      const video = await videoToAdd.save();
      return res
        .status(201)
        .json({ msg: `${video.Title} has been added to your watch list` });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({
        msg:
          'The server was unable to process your request due to an internal error'
      });
    }
  }
);

//@route    DELETE api/videos
//desc      Remove video from user's watch list
//@access   Private
router.delete('/:videoID', auth, async (req, res) => {
  try {
    let videoToRemove = await Video.findById(req.params.videoID).select('-__v');

    if (!videoToRemove) {
      return res.status(404).json({ msg: 'Video not found' });
    }

    if (videoToRemove.userID.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    let removedVideo = await Video.findByIdAndRemove(videoToRemove._id);

    res.status(200).json({
      msg: `${removedVideo.Title} has been removed from your watch list`
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      msg:
        'The server was unable to process your request due to an internal error'
    });
  }
});
module.exports = router;
