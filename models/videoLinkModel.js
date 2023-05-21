const mongoose = require("mongoose");

const videoLinkModel = mongoose.Schema(
  {
    videoId: { type: String, required: true },
    videoPath: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);


const videoLinkCreation = mongoose.model("videoLink", videoLinkModel);

module.exports = videoLinkCreation;
