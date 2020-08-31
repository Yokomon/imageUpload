const router = require("express").Router(),
  errorHandler = require("../controllers/errorHandler");

router.use(errorHandler.cors, errorHandler.notFound, errorHandler.ISE);

module.exports = router;
