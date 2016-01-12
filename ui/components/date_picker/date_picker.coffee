require('./date_picker.css')
require('./i18n_zh_CN')
Component = require('../../component.coffee')

DatePicker = Component.extend({
  renderAfter: ->
    $target = this.$target
    opt = {
        changeYear: $target.attr('change-year') || false,
        changeMonth: $target.attr('change-month') || false,
        numberOfMonths: Number($target.attr('number-month')) || 1,
        defaultDate: $target.attr('default-date'),
        hideIfNoPrevNext: true,
        yearRange: '1900:2050'
    }
    minDate = $target.attr('min-date')
    if minDate and /^#/.test(minDate)
      if /\+$/.test(minDate)
        operator = '+'
        $minDateTarget = $(minDate.substr(0, minDate.length - 1))
      else if /-$/.test(minDate)
        operator = '-'
        $minDateTarget = $(minDate.substr(0, minDate.length - 1))
      else
        $minDateTarget = $(minDate)
    if $minDateTarget
      $minDateTarget.datepicker('option', {
        onSelect: ->
          value = $(this).val()
          id = $(this).attr('id')
          $targets = $('input[min-date^="#' + id + '"]')
          $targets.each ->
            _minDate = $(this).attr('min-date')
            _value = value
            if /\+$/.test(_minDate)
              _value = moment(value).add(1, 'days').format("YYYY-MM-DD")
            else if /-$/.test(_minDate)
              _value = moment(value).subtract(1, 'days').format("YYYY-MM-DD")
            $(this).datepicker('option', 'minDate', _value)
            @
          @
      })
    if minDate
      unless $minDateTarget
        opt.minDate = minDate
      else
        value = $minDateTarget.val()
        if value
          if operator is '+'
            value = moment(value).add(1, 'days').format("YYYY-MM-DD")
          else if operator is '-'
            value = moment(value).subtract(1, 'days').format("YYYY-MM-DD")
          opt.minDate = value
        else
          _minDate = $minDateTarget.attr('min-date')
          if _minDate
            opt.minDate = _minDate
    maxDate = $target.attr("max-date")
    if maxDate
      opt.maxDate = maxDate
    $target.datepicker(opt)
    @
})

module.exports = DatePicker
