const router = require("express").Router(),
  errorRoutes = require("./errorRoutes");

router.use("/", errorRoutes);

module.exports = router;
