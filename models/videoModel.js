const mongoose = require("mongoose"),
  { Schema } = mongoose,
  videoSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        unique: true,
      },
      id: {
        type: String,
        unique: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model("Video", videoSchema);
