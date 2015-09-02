require('./date_picker.css');
require('./i18n_zh_CN');
var Component = require('../../component');

var DatePicker = Component.extend({
  renderAfter: function() {
    var $el = this.$el,
        $minDateEl,
        $maxDateEl;
    var opt = {
        changeYear: $el.attr('changeYear') || false,
        changeMonth: $el.attr('changeMonth') || false,
        hideIfNoPrevNext: true
    }
    $el.datepicker(opt);
    var minDate = $el.attr("minDate");
    if(!minDate) {
      minDate = '+0';
    } else {
      if(/^#/.test(minDate)) {
        $minDateEl = $(minDate);
      }
    }
    var maxDate = $el.attr("maxDate");
    if($maxDateEl) {
      maxDate = '+99999';
    } else {
      if(/^#/.test(maxDate)) {
        $maxDateEl = $(maxDate);
      }
    }
    if($minDateEl) {
      $minDateEl.datepicker("option", {
        onSelect: function() {
          $el.datepicker('option', 'minDate', $(this).val());
        }
      })
    }
    $el.datepicker('option', 'minDate', minDate);
    $el.datepicker('option', 'maxDate', maxDate);
  }
});

module.exports = DatePicker;
