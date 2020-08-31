const image = require("../models/imageModel"),
  getImageParams = (body) => {
    return {
      imageName: body.imageName,
      userId: body.userId,
      userName: body.userName,
    };
  };
