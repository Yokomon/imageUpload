const Video = require("../models/videoModel"),
  cloud = require("../config/cloudConfig");

module.exports = {
  // Create action for a new video
  create: (req, res, next) => {
    // First check if the file exists in the Database
    let test = {
      name: req.files[0].originalname,
      url: req.files[0].path,
      id: "",
    };
    console.log(req.files[0].originalname);
    Video.find({ name: test.name }, (err, cb) => {
      if (err) {
        res.json({
          error: true,
          message: `There was a problem uploading the video because: ${err.message}`,
        });
      } else {
        let file = {
          name: req.files[0].originalname,
          url: req.files[0].path,
          id: "",
        };
        cloud
          .uploads(file.url)
          .then((result) => {
            Video.create({
              name: req.files[0].originalname,
              url: result.url,
              id: result.id,
            });
          })
          .then((result) => {
            res.json({
              success: true,
              data: result,
            });
          })
          .catch((err) => {
            res.json({
              error: true,
              message: err.message,
            });
          });
      }
    });
  },
  //   Get all images in the database
  getVideos: (req, res) => {
    Video.find({})
      .exec()
      .then((videos) => {
        res.json({
          success: true,
          data: videos,
        });
      })
      .catch((err) => {
        res.json({
          error: true,
          message: `Cannot fetch videos because: ${err.message}`,
        });
      });
  },
};
