_ = kyo._
autoParse = (component) ->
  if component.cid then $el = component.$el else $el = $(component)
  $inputs = $el.find("[data-type]")
  $inputs.each((index, ele) ->
    $parent = getParentComponent($(ele))
    _parse($(ele), component) if $parent.attr('kui-id') is $el.attr('kui-id')
  )


getParentComponent = ($e) ->
  $parent = $e.parent()
  until $parent and $parent.attr('kui-id')
    $parent = $parent.parent()
  $parent

_parse = ($e, parent) ->
   DatePickerAutoParse = require('./components/date_picker/auto_parse.coffee')
   DropMenuAutoParse = require('./components/drop_menu/auto_parse.coffee')
   TipAutoParse = require('./components/tip/auto_parse')
   type = $e.data('type')
   switch type
     when 'date'
        datePicker = DatePickerAutoParse($e)
        datePicker.parent = parent
        datePicker.render()
     when 'drop-menu'
        dropMenu = DropMenuAutoParse($e, parent)
        dropMenu.parent = parent
        dropMenu.render($e, true)
     when 'tip'
      tip = TipAutoParse($e, parent)
      tip.parent = parent
      tip.render($e)
module.exports = autoParse
