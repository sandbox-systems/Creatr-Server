const controller = require('../controllers/content');
const validateToken = require('../util/utils').validateToken;

module.exports = (router) => {
  router.route('/content')
    .post(validateToken, controller.add)
    .get(validateToken, controller.getAll)  
};