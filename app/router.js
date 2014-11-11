import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('events', function(){
    this.route('show', {path: '/:event_id'}, function(){
      this.route('requests.show', {path: '/requests/:request_id'});
    });
  });
});

export default Router;
