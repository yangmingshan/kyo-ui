var Component = require('../../component');

var DatePicker = Component.extend({
  renderAfter: function() {
    this.$el.datepicker();
  }
});

module.exports = DatePicker;
