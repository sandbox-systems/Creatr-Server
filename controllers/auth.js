const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const connUri = process.env.MONGO_LOCAL_CONN_URL;
const User = require('../models/users');

module.exports = {
  add: (req, res) => {
    mongoose.connect(connUri, { useNewUrlParser : true }, (err) => {
      let result = {};
      let status = 201;
      if (!err) {
        const { email, password, firstname, lastname, role } = req.body;
        const user = new User({ email, password, firstname, lastname, role }); // document = instance of a model
        // TODO: We can hash the password here as well before we insert
        user.save((err, user) => {
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
    });
  },
  login: (req, res) => {
    const { email, password } = req.body;

    mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
      let result = {};
      let status = 200;
      if(!err) {
        User.findOne({email}, (err, user) => {
          if (!err && user) {
            // We could compare passwords in our model instead of below as well
            bcrypt.compare(password, user.password).then(match => {
              if (match) {
                status = 200;
                // Create a token
                const payload = { user: user.email, role: user.role };
                const options = { expiresIn: '2d', issuer: 'https://scotch.io' };
                const secret = process.env.JWT_SECRET;
                const token = jwt.sign(payload, secret, options);

                result.token = token;
                result.status = status;
                result.result = user;
              } else {
                status = 401;
                result.status = status;
                result.error = `Authentication error`;
              }
              res.status(status).send(result);
            }).catch(err => {
              status = 500;
              result.status = status;
              result.error = err;
              res.status(status).send(result);
            });
          } else {
            status = 404;
            result.status = status;
            result.error = err;
            res.status(status).send(result);
          }
        });
      } else {
        status = 500;
        result.status = status;
        result.error = err;
        res.status(status).send(result);
      }
    });
  },
  refresh: (req, res) => {
    const {user, role} = req.decoded;
      let result = {};
      let status = 200;
            // We could compare passwords in our model instead of below as well

      status = 200;
      // Create a token
      const payload = { user, role};
      const options = { expiresIn: '2d', issuer: 'https://scotch.io' };
      const secret = process.env.JWT_SECRET;
      const token = jwt.sign(payload, secret, options);

      result.token = token;
      result.status = status;
    
      res.status(status).send(result);
  },
  getCurrent: (req, res) => {
    mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
      let result = {};
      let status = 200;
      const {user} = req.decoded
      if(!err) {
        User.findOne({email:user}, (err, user) => {
          if (!err && user) {
            // We could compare passwords in our model instead of below as well
                status = 200;
                result.status = status;
                result.result = user;

                res.status(status).send(result);
          } else {
            status = 404;
            result.status = status;
            result.error = err;
            res.status(status).send(result);
          }
        });
      } else {
        status = 500;
        result.status = status;
        result.error = err;
        res.status(status).send(result);
      }
    });
  }
};