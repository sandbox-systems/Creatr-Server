const mongoose = require("mongoose");
const youtube = require("../util/youtube");
const connUri = process.env.MONGO_LOCAL_CONN_URL;
const Video = require("../models/videos");

module.exports = {
  startStream: async (req, res) => {
    let result = {};
    let status = 200;
    try {
      await mongoose.connect(connUri);
      let video = await Video.findById(req.body.id);
      const broadcast = await youtube.createBroadcast(video);
      await Video.update(
        { _id: req.body.id },
        {
          vid: broadcast.id,
          state: "live",
          section: video.section
        }
      );
      video = await Video.findById(req.body.id);
      result.status = status;
      result.result = video;
      res.status(status).send(result);
    } catch (error) {
      res.status(status).send(result);
      // return next(error);
      console.log(error);
    }
  },
  stopStream: async (req, res) => {
    let result = {};
    let status = 200;
    try {
      await mongoose.connect(connUri);
      let video = await Video.findById(req.body.id);
      await Video.update(
        { _id: req.body.id },
        { state: "completed" }
      );
      video = await Video.findById(req.body.id);
      await youtube.stopBroadcast();
      result.status = status;
      result.result = video;
      res.status(status).send(result);
    } catch (error) {
      // res.status(status).send(result);
      console.log(error);
      res.status(status).send(result);
      //return next(error);
    }
  },
  getStream: async (req, res) => {
    let result = {};
    let status = 200;
    try {
      const {section} = req.decoded;
      console.log(section);
      await mongoose.connect(connUri);
      let video = await Video.findOne({ 
        state: "live", 
        section:{$in:section}});
      const livestream = await youtube.getLivestream();
      // video.streamkey = livestream.cdn.ingestionInfo.streamName
      //console.log(video)
      result.status = status;
      result.result = video;
      result.key = livestream.cdn.ingestionInfo.streamName;
      res.status(status).send(result);
    } catch (error) {
      console.error(error);
      // status = 500;
      // result.status = status;
      // res.status(status).send(result);
      return next(error);
    }
  }
};
