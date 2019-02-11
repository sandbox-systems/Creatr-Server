const controller = require('../controllers/chat');
const validateToken = require('../util/utils').validateToken;

module.exports = (router) => {
  router.route('/messages/:video?')
    .post(validateToken, controller.add)
    .get(validateToken, controller.getAll)  
};