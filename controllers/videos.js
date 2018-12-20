const mongoose = require("mongoose");
const youtube = require("../util/youtube");
const connUri = process.env.MONGO_LOCAL_CONN_URL;
const Video = require("../models/videos");

module.exports = {
  add: (req, res) => {
    mongoose.connect(
      connUri,
      { useNewUrlParser: true },
      err => {
        let result = {};
        let status = 201;
        if (!err) {
          const { name, description, tags, date } = req.body;
          const video = new Video({ name, description, tags, date }); // document = instance of a model
          video.save((err, user) => {
            if (!err) {
              result.status = status;
              result.result = user;
            } else {
              status = 500;
              result.status = status;
              result.error = err;
            }
            res.status(status).send(result);
          });
        } else {
          status = 500;
          result.status = status;
          result.error = err;
          res.status(status).send(result);
        }
      }
    );
  },
  remove: async (req, res) => {
    let result = {};
    let status = 200;
    try {
      await mongoose.connect(connUri);
      video = await Video.findById(req.body.id);
      // console.log(video);
      await Video.deleteOne({ _id: req.body.id })
      result.status = status;
      result.result = video;
      res.status(status).send(result);
    } catch (error) {
      res.status(status).send(result);
      console.log(error);
    }
  },
  getAll: (req, res) => {
    mongoose.connect(
      connUri,
      { useNewUrlParser: true },
      err => {
        let result = {};
        let status = 200;
        if (!err) {
          const payload = req.decoded;
          if (payload) {
            Video.find()
              .sort({ _id: -1 })
              .exec((err, users) => {
                if (!err) {
                  result.status = status;
                  result.error = err;
                  result.result = users;
                } else {
                  status = 500;
                  result.status = status;
                  result.error = err;
                }
                res.status(status).send(result);
              });
          } else {
            status = 401;
            result.status = status;
            result.error = `Authentication error`;
            res.status(status).send(result);
          }
        } else {
          status = 500;
          result.status = status;
          result.error = err;
          res.status(status).send(result);
        }
      }
    );
  }
};
