const controller = require('../controllers/users');
const validateToken = require('../util/utils').validateToken;

module.exports = (router) => {
  router.route('/users')
    .get(validateToken, controller.getAll) 
  router.route('/users/:id')
    .put(validateToken, controller.update)  
}    