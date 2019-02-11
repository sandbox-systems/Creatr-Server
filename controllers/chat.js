const mongoose = require('mongoose');

const connUri = process.env.MONGO_LOCAL_CONN_URL;
const User = require('../models/users');
const Video = require('../models/videos');
const Content = require('../models/content');
const Message = require('../models/messages')


module.exports = {
  
  add: async (req, res) => {
    let result = {};
    let status = 200;
    try {
      await mongoose.connect(connUri);

      const {user} = req.decoded;
      const {_id: author} = await User.findOne({email:user}); // get user info base on auth token

      const { message, video } = req.body;
      let messages = new Message({ message, video, author});
      messages = await messages.save()
      messages = await Message.populate(messages,  {path:"author"})
      console.log(messages)
      result.status = status;
      result.result = messages;
      req.io.emit('message',messages)
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
      const {video} = req.params;
      console.log(req.body)
      const messages  = await Message
        .find({video})
        .populate(['author']) // fill in data for author and video refs
        .sort({ _id: 1 }) // reverse order (recent first)
        .exec()

      result.status = status;
      result.result = messages;
      res.status(status).send(result);
    } catch (error) {
      console.log(error);
      let status = 500;
      result.error = error;
      res.status(status).send(result);
    }
  },
};