import Ember from 'ember';

function dateTimeFromNaturalLanguage( strProp ){
  return Ember.computed( strProp, function(){
    var str = this.get(strProp);
    if(str){
      return window.chrono.parseDate( str ).toISOString();
    }
  });
}

export default Ember.ArrayController.extend({
  sortProperties: ['occurredAt'],
  queryParams: ['email', 'start', 'end'],
  email: null,
  start: null,
  end: null,
  isSaving: false,
  emailFilter: Ember.computed.oneWay('email'),
  startTime: Ember.computed.oneWay('start'),
  endTime: Ember.computed.oneWay('end'),
  startDateTime: dateTimeFromNaturalLanguage('startTime'),
  endDateTime: dateTimeFromNaturalLanguage('endTime'),
  isFiltering: Ember.computed.or('email', 'start', 'end'),
  savedFilters: function(){
    return this.store.find('filter');
  }.property(),
  setFilter: function(){
    var filter = this.get('selectedFilter');
    this.set('email', filter.get('email'));
    this.set('start', filter.get('start'));
    this.set('end', filter.get('end'));
  }.observes('selectedFilter'),
  filters: function(){
    var filters = {};
    var emailFilter = this.get('emailFilter');
    var startDateTime = this.get('startDateTime');
    var endDateTime = this.get('endDateTime');

    if(emailFilter){ filters.email = emailFilter; }
    if(startDateTime){ filters.start = startDateTime; }
    if(endDateTime){ filters.end = endDateTime; }
    return filters;
  }.property('emailFilter', 'startDateTime', 'endDateTime'),
  chartData: function(){
    var hours = {};
    this.get('model' ).forEach(function(item){
      var hour = window.moment(item.get('occurredAt' )).hour();
      if(hours[hour]){
        hours[hour]++;
      }
      else{
        hours[hour] = 1;
      }
    });
    return hours;
  }.property('model.@each.occurredAt'),
  actions: {
    reset: function(){
      this.set('email', null);
      this.set('start', null);
      this.set('end', null);
      this.set('emailFilter', null);
      this.set('startTime', null);
      this.set('endTime', null);
    },
    saveFilter: function(){
      var controller = this;
      controller.set('failedToSave', false);
      controller.set('isSaving', true);
      var filters = this.store.createRecord('filter', {
        email: this.get('email'),
        start: this.get('start'),
        end: this.get('end')
      });
      filters.save()
        .catch(function(){
          controller.set('failedToSave', true);
        })
        .finally(function(){
          controller.set('isSaving', false);
        });
    }
  }
});
