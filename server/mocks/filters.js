module.exports = function(app) {
  var express = require('express');
  var filtersRouter = express.Router();
  filtersRouter.post('/', function(req, res) {
    res.send({"filter": req.body.filter});
  });
  app.use('/api/filters', filtersRouter);
};
