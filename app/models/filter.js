import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  start: DS.attr('date'),
  end: DS.attr('date')
});
