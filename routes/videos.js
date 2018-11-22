const controller = require('../controllers/videos');
const validateToken = require('../utils').validateToken;

module.exports = (router) => {
  router.route('/videos')
    .post(controller.add)
    .get(validateToken, controller.getAll)
};