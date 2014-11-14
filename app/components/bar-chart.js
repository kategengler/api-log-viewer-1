import Ember from 'ember';

export default Ember.Component.extend({
  dataFormatted: function(){
    var data = this.get('data');
    var formatted = [];
    var keys = Ember.keys(data);
    keys.forEach(function(key){
      formatted.pushObject({key: key, value: data[key]});
    });
    return formatted;
  }.property('data')
});
