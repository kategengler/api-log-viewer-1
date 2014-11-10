module.exports = function(app) {
  var express = require('express');
  var eventsRouter = express.Router();
  eventsRouter.get('/', function(req, res) {
    res.send({"events":[]});
  });
  app.use('/api/events', eventsRouter);
};
