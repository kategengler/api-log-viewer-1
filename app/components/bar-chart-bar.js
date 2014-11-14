import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['style'],
  style: function(){
    return "height: " + this.get('value') + "px;float:left;background-color:blue;width:50px;border:1px solid #FFF;color:#ccc;";
  }.property('value')
});
