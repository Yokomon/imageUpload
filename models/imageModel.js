const mongoose = require("mongoose"),
  { Schema } = mongoose,
  imageSchema = new Schema(
    {
      imageName: {
        type: String,
        required: true,
      },
      imageUrl: {
        type: String,
      },
      imageId: {
        type: String,
      },
      clientId: {
        type: Number,
        required: true,
        unique: true,
      },
      clientUsername: {
        type: String,
        required: true,
        lowercase: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model("Images", imageSchema);
