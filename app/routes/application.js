import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    filter: function(filters){
      this.transitionTo('events', {queryParams: filters});
    }
  }
});
