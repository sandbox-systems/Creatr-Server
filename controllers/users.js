const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connUri = process.env.MONGO_LOCAL_CONN_URL;
const User = require('../models/users');

module.exports = {
  
  getAll: (req, res) => {
    mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
      let result = {};
      let status = 200;
      if (!err) {
        const payload = req.decoded;
        // if (payload && payload.role === 'admin') {
        if (true) {
          User.find({}, (err, users) => {
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
    });
  },
  
  update: async (req, res) => {
    let result = {};
    let status = 200;

    try {
      await mongoose.connect(connUri);

      const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
      )

      result.status = status;
      result.result = user;
      res.status(status).send(result);
    } catch (error) {
      console.log(error);
      let status = 500;
      result.error = error;
      res.status(status).send(result);
    }
  }
};