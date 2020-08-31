var imageModel = require("../models/imageModel");
//IMPORT CLOUDINARY CONFIG
var cloud = require("../config/cloudConfig");

exports.createImage = (req, res) => {
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
        var imageDetails = {
          imageName: req.files[0].originalname,
          imageUrl: result.url,
          imageId: result.id,
          clientId: req.body.clientId,
          clientUsername: req.body.clientUsername,
        };
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
};
