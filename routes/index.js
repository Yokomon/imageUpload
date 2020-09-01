const router = require("express").Router(),
  errorRoutes = require("./errorRoutes"),
  videoRoutes = require("./videoRoutes"),
  imageRoutes = require("./imageRoutes");

router
  .use("/images", imageRoutes)
  .use("/videos", videoRoutes)
  .use("/", errorRoutes);

module.exports = router;
