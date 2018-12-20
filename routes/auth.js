const controller = require('../controllers/auth');
const validateToken = require('../util/utils').validateToken;

module.exports = (router) => {
  router.route('/auth/register')
    .post(validateToken, controller.add)
  router.route('/auth/login')
    .post( controller.login)
  router.route('/auth/refresh')
    .get(validateToken, controller.refresh)
  router.route('/me')
    .get(validateToken, controller.getCurrent)
};