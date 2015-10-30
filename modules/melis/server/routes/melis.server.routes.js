'use strict';

module.exports = function(app) {
  var melis = require('../controllers/melis.server.controller');
  var melisPolicy = require('../policies/melis.server.policy');

  // Melis Routes
  app.route('/api/melis').all()
  .get(melis.list).all(melisPolicy.isAllowed)
  .post(melis.create);

  app.route('/api/melis/:meliId').all(melisPolicy.isAllowed)
  .get(melis.read)
  .put(melis.update)
  .delete(melis.delete);

  // Finish by binding the Meli middleware
  app.param('meliId', melis.meliByID);
};