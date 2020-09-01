const upload = require("../config/multerConfig"),
  imageController = require("../controllers/imageController"),
  router = require("express").Router();

router
  .post("/postImages", upload.imageUpload.any(), imageController.createImage)
  .get("/getImages", imageController.getImages)
  .get("/showImages", imageController.showImage);

module.exports = router;
