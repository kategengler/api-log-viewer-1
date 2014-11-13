module.exports = function(app) {
  var express = require('express');
  var filtersRouter = express.Router();
  filtersRouter.post('/', function(req, res) {
    function randomInt (low, high) {
      return Math.floor(Math.random() * (high - low) + low);
    }

    var shouldFail = randomInt(0, 2);
    setTimeout(function(){
      if(shouldFail){
        res.status(500);
        res.send('Failure!');
      }
      else {
        var filter = req.body.filter;
        filter.id = 22;
        res.send({"filter": filter});
      }
    }, 1000);
  });

  filtersRouter.get('/', function(req, res) {
    var filters = [
      {id: 1, email: 'epperson@fundinggates.com', start: null, end: null},
      {id: 2, email: null, start: "2014-11-09T17:00:00.000Z", end: null },
      {id: 3, email: 'marybeth@gmail.com', start: null, end: "2014-11-09T17:00:00.000Z"}
    ]
    res.send({"filters": filters});
  });

  app.use('/api/filters', filtersRouter);
};
