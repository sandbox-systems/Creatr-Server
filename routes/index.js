const users = require('./users');
const videos = require('./videos')
const content = require('./content')
const streams = require('./streams')
const auth = require('./auth')

module.exports = (router) => {
  users(router);
  videos(router);
  streams(router);
  auth(router);
  content(router);
  return router;
};