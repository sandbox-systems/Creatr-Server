const controller = require('../controllers/videos');
const validateToken = require('../util/utils').validateToken;

module.exports = (router) => {
  router.route('/videos')
    .post(validateToken, controller.add)
    .get(validateToken, controller.getAll)
    .delete(validateToken, controller.remove)
};