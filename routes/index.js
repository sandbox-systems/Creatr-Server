const users = require('./users');
const videos = require('./videos')
module.exports = (router) => {
  users(router);
  videos(router);
  return router;
};