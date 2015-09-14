require('./date_picker.css');
require('./i18n_zh_CN');
var Component = require('../../component');

var DatePicker = Component.extend({
  renderAfter: function() {
    var $target = this.$target,
        $minDateTarget,
        $maxDateTarget;
    var opt = {
        changeYear: $target.attr('changeYear') || false,
        changeMonth: $target.attr('changeMonth') || false,
        hideIfNoPrevNext: true
    }
    $target.datepicker(opt);
    var minDate = $target.attr("minDate");
    if(minDate) {
      if(/^#/.test(minDate)) {
        $minDateTarget = $(minDate);
      }
    }
    var maxDate = $target.attr("maxDate");
    if($maxDateTarget) {
      maxDate = '+99999';
    } else {
      if(/^#/.test(maxDate)) {
        $maxDateTarget = $(maxDate);
      }
    }
    if($minDateTarget) {
      $minDateTarget.datepicker("option", {
        onSelect: function() {
          $target.datepicker('option', 'minDate', $(this).val());
        }
      })
    }
    if(minDate) {
      $target.datepicker('option', 'minDate', minDate);
    }
    $target.datepicker('option', 'maxDate', maxDate);
  }
});

module.exports = DatePicker;
