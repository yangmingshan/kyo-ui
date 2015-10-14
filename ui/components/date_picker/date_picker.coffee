require('./date_picker.css')
require('./i18n_zh_CN')
Component = require('../../component.coffee')

DatePicker = Component.extend({
  renderAfter: ->
    $target = this.$target
    $minDateTarget
    $maxDateTarget
    opt = {
        changeYear: $target.attr('change-year') || false,
        changeMonth: $target.attr('change-month') || false,
        defaultDate: $target.attr('default-date'),
        hideIfNoPrevNext: true,
        yearRange: '1900:2050'
    }
    minDate = $target.attr("min-date")
    if minDate
      if /^#/.test(minDate)
        $minDateTarget = $(minDate)
    maxDate = $target.attr("max-date")
    if $maxDateTarget
      maxDate = '+99999'
    else
      if(/^#/.test(maxDate))
        $maxDateTarget = $(maxDate)
    if $minDateTarget
      $minDateTarget.datepicker("option", {
        onSelect: ->
          $target.datepicker('option', 'minDate', $(this).val())
      })
    if minDate
      opt.minDate = minDate
    if maxDate
      opt.maxDate = maxDate
    $target.datepicker(opt)
    @
})

module.exports = DatePicker
