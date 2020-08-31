module.exports = {
  //CORS ERROR HANDLER
  cors: (req, res, next) => {
    res.header("Allow-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if (req.method === "OPTIONS") {
      res.headers("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
      return res.status(200).json({});
    }
    next();
  },

  // Not Found: 404
  notFound: (req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
  },

  // Internal Server Error: 500
  ISE: (error, req, res, next) => {
    res.status(error.status || 500).json({
      error: {
        status: error.status || 500,
        message: error.message || "Internal Server Error",
      },
    });
  },
};
