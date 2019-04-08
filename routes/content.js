const controller = require('../controllers/content');
const validateToken = require('../util/utils').validateToken;

module.exports = (router) => {
  router.route('/content')
    .post(validateToken, controller.add)
    .get(validateToken, controller.getAll)
  router.route('/content/:id') 
    .put(validateToken, controller.update)
  router.route('/public/content/:name')     
    .get(controller.getOneByName)
};