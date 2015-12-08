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
        numberOfMonths: Number($target.attr('number-month')) || 1,
        defaultDate: $target.attr('default-date'),
        hideIfNoPrevNext: true,
        yearRange: '1900:2050'
    }
    minDate = $target.attr("min-date")
    if minDate
      if /^#/.test(minDate)
        m = minDate.split(/\+|-/)
        target= m[0]
        day = m[1]
        operator = minDate.match(/\+|-/)[0] if day
        $minDateTarget = $(target)
    maxDate = $target.attr("max-date")
    if $maxDateTarget
      maxDate = '+99999'
    else
      if(/^#/.test(maxDate))
        $maxDateTarget = $(maxDate)
    if $minDateTarget
      $minDateTarget.datepicker("option", {
        onSelect: ->
          _minDate = $(this).val()
          if operator is '+'
            _minDate = moment(_minDate).add(1, 'day').format("YYYY-MM-DD")
          if operator is '-'
            _minDate = moment(_minDate).subtract(1, 'day').format("YYYY-MM-DD")

          $target.datepicker('option', 'minDate', _minDate)
      })
    if minDate
      opt.minDate = minDate
    if maxDate
      opt.maxDate = maxDate
    $target.datepicker(opt)
    @
})

module.exports = DatePicker
