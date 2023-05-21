const express = require("express");
const { videoQueueController ,create} = require("../controllers/videoController");

const router = express.Router();

router.route("/create").post(create)

router.route("/getVideo").post(videoQueueController)

module.exports = router;
