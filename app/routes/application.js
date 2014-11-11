import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    filter: function(emailFilter){
      this.transitionTo('events', {queryParams: {email: emailFilter}});
    }
  }
});
