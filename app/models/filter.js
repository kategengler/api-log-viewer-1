import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  start: DS.attr('date'),
  end: DS.attr('date'),
  description: function(){
    var description = "";
    if(this.get('email')){
      description = description + "Email: " + this.get('email');
    }
    if(this.get('start')){
      description = description + "Start: " + this.get('start');
    }
    if(this.get('end')){
      description = description + "End: " + this.get('end');
    }
    return description;
  }.property('email', 'start', 'end')
});
