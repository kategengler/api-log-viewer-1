import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    email: { refreshModel: true }
  },
  model: function(params){
    var defaultFilters = {filter: 'recent'};
    var filters = params || defaultFilters;
    return this.store.find('event', filters);
  }
});
