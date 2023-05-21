const Queue = require("bull");
const videoLinkCreation = require("../models/videoLinkModel");
var ffmpeg = require("ffmpeg");

const videoQueue = new Queue("videoQueue", {
  redis: { port: process.env.REDIS_PORT, host: process.env.REDIS_URI },
});

const create = async (req, res) => {
  const { videoId, videoPath } = req.body;
  try {
    const video = await videoLinkCreation.create({
      videoId,
      videoPath,
    });
    res.json(video);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const videoConverter = async (videoPath) => {
  console.log("inconverter");
  var process = new ffmpeg(videoPath); //./controllers/SampleVideo_1280x720_30mb.mp4
  process.then(
    function (video) {
      // Callback mode
      video.setDisableAudio().save("./videos/test.mp4", function (error, file) {
        if (!error) console.log("Video file: " + file);
      });
    },
    function (err) {
      console.log("Error: " + err);
    }
  );
};

videoQueue.process(async (job) => {
  console.log("inprocess");
  try {
    const { videoId, videoPath } = job.data.conversion;
    const conversions = await videoLinkCreation.find({ videoId });
    const conv = conversions[0];
    await videoConverter(videoPath);
  } catch (error) {
    Promise.reject(error);
    res.status(400).json({ message: "server error" });
  }
});

const videoQueueController = async (req, res) => {
  try {
    const { videoId } = req.body;
    const conversions = await videoLinkCreation.find({ videoId });
    const conversion = conversions[0];
    await videoQueue.add({conversion}).then(() => {
      res.json({ message: "Video added in the queue" });
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "server error" });
  }
};

module.exports = { videoQueueController, create };
