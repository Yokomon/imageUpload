const imageModel = require("../models/imageModel"),
  ObjectId = require("mongodb").ObjectId;
//IMPORT CLOUDINARY CONFIG
const cloud = require("../config/cloudConfig");

module.exports = {
  createImage: (req, res) => {
    let imageDetails = {
      imageName: req.files[0].originalname,
    };
    //USING MONGOOSE METHOD TO FIND IF IMAGE-NAME EXIST IN THE DB
    imageModel.find({ imageName: imageDetails.imageName }, (err, callback) => {
      //CHECKING IF ERROR OCCURRED.
      if (err) {
        res.json({
          err: err,
          message: "there was a problem uploading image",
        });
        console.log("there was a problem uploading image");
      } else {
        let attempt = {
          imageName: req.files[0].originalname,
          imageUrl: req.files[0].path,
          imageId: "",
        };
        cloud.uploads(attempt.imageUrl).then((result) => {
          let imageDetails = {
            imageName: req.files[0].originalname,
            imageUrl: result.url,
            imageId: result.id,
            clientId: req.body.clientId,
            clientUsername: req.body.clientUsername,
          };
          // Create image in the database
          imageModel
            .create(imageDetails)
            .then((image) => {
              res.json({
                success: true,
                data: image,
              });
            })
            .catch((error) => {
              res.json({
                success: false,
                message: `Error creating image in the database because: ${error.message}`,
              });
            });
        });
      }
    });
  },
  // Get all images in the DB
  getImages: (req, res) => {
    imageModel
      .find({})
      .then((images) => {
        res.json({
          success: true,
          data: images,
        });
      })
      .catch((err) => {
        res.json({
          success: false,
          message: `Could not fetch images because: ${err.message}`,
        });
      });
  },
  // Fetch single image file in the DB
  showImage: (req, res) => {
    imageModel
      .findOne({ _id: new ObjectId(req.params.id) })
      .exec()
      .then((image) => {
        res.json({
          success: true,
          data: image,
        });
      })
      .catch((error) => {
        res.json({
          success: false,
          message: error.message,
        });
      });
  },
};
