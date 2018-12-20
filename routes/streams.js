const controller = require('../controllers/streams');
const validateToken = require('../util/utils').validateToken;

module.exports = (router) => {
  router.route('/streams')
    .post(validateToken, controller.startStream)
    .delete(validateToken, controller.stopStream)
    .get(validateToken, controller.getStream)
    // .get(validateToken, controller.getStream)
};