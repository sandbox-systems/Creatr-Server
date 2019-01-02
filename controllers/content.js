const mongoose = require('mongoose');

const connUri = process.env.MONGO_LOCAL_CONN_URL;
const User = require('../models/users');
const Video = require('../models/videos');
const Content = require('../models/content');


module.exports = {
  
  add: async (req, res) => {
    let result = {};
    let status = 200;
    try {
      await mongoose.connect(connUri);

      const {user} = req.decoded;
      const {_id: author} = await User.findOne({email:user}); // get user info base on auth token

      const { title, description, video, tags, data } = req.body;
      let content = new Content({ title, description, video, tags, author, data});
      content = await content.save()

      result.status = status;
      result.result = content;
      res.status(status).send(result);
    } catch (error) {
      console.log(error);
      let status = 500;
      result.error = error;
      res.status(status).send(result);
    }
  },
  getAll: async (req, res) => {
    let result = {};
    let status = 200;
    try {
      await mongoose.connect(connUri);

      const content  = await Content.find()
        .populate(['author','video']) // fill in data for author and video refs
        .sort({ _id: -1 }) // reverse order (recent first)
        .exec()

      result.status = status;
      result.result = content;
      res.status(status).send(result);
    } catch (error) {
      console.log(error);
      let status = 500;
      result.error = error;
      res.status(status).send(result);
    }
  },
};