const mongoose = require("mongoose");
const youtube = require("../util/youtube");
const connUri = process.env.MONGO_LOCAL_CONN_URL;
const moment = require('moment')
const mail = require('../util/mail')
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
          const { name, description, tags, date, section } = req.body;
          const video = new Video({ name, description, tags, date, section }); // document = instance of a model
          video.save(async (err, video) => {
            if (!err) {
              result.status = status;
              result.result = video;
              mail.sendMessage({
                to:  await mail.getEmailsBySection(video.section),
                sub: 'New Livestream Scheduled',
                txt: `Title: ${video.name}\nClass: ${video.section.join(", ")}\nTime: ${moment(video.date).format("dddd, MMMM Do YYYY, h:mm a")}`
              })
                .then(res=> console.log(res))
                .catch(err  => console.log(err));
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
