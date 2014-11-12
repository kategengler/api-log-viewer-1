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
  queryParams: ['email', 'start', 'end'],
  email: null,
  start: null,
  end: null,
  emailFilter: Ember.computed.oneWay('email'),
  startDateTime: dateTimeFromNaturalLanguage('startTime'),
  endDateTime: dateTimeFromNaturalLanguage('endTime'),
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
  actions: {
    reset: function(){
      this.set('email', null);
      this.set('start', null);
      this.set('end', null);
    }
  }
});
