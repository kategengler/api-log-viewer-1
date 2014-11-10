module.exports = function(app) {
  var express = require('express');
  var requestsRouter = express.Router();
  requestsRouter.get('/', function(req, res) {
    res.send({"requests":[]});
  });
  app.use('/api/requests', requestsRouter);
};
