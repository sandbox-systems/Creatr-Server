const controller = require('../controllers/users');
const validateToken = require('../util/utils').validateToken;

module.exports = (router) => {
  router.route('/users')
    .get(validateToken, controller.getAll); // This route will be protected
};