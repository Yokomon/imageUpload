const router = require("express").Router(),
  errorRoutes = require("./errorRoutes"),
  imageController = require("../controllers/imageController"),
  upload = require("../config/multerConfig");

router
  .post("/postImages", upload.any(), imageController.createImage)
  .get("/getImages", imageController.getImages)
  .get("/showImage", imageController.showImage)
  .use("/", errorRoutes);

module.exports = router;
