const express = require("express"),
  app = express();

app
  .use(express.urlencoded({ extended: false }))
  .use(express.json())
  .set("port", process.env.PORT || 3000)
  .listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
  });
