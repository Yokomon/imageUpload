const videoController = require("../controllers/videoController"),
  upload = require("../config/multerConfig"),
  router = require("express").Router();

router
  .post("/postVideo", upload.videoUpload.any(), videoController.create)
  .get("/getVideos", videoController.getVideos);

module.exports = router;
