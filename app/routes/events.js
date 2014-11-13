import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    email: { refreshModel: true },
    start: { refreshModel: true },
    end: { refreshModel: true }
  },
  model: function(params){
    var defaultFilters = {filter: 'recent'};
    var filters = defaultFilters;
    if(params.email || params.start || params.end){
      filters = params;
    }
    return this.store.find('event', filters);
  },
  actions : {
    refresh: function(callback){
      this.refresh();
      callback();
    }
  }
});
