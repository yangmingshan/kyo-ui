_ = kyo._
autoParse = (component) ->
  $el = component.$el
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
   type = $e.data('type')
   switch type
     when 'date'
        datePicker = DatePickerAutoParse($e)
        datePicker.parent = parent
        datePicker.render()
     when 'drop-menu'
        dropMenu = DropMenuAutoParse($e, parent)
        dropMenu.render($e, true)
# AutoParse.prototype.autoParse = ->
#     DatePickerAutoParse = require('./components/date_picker/auto_parse.coffee')
#     DropMenuAutoParse = require('./components/drop_menu/auto_parse.coffee')
#     inputs = @$("[data-type]")
#     inputs.each( (index, ele) ->
#       type = $(@).data('type')
#       switch type
#         when 'date' then DatePickerAutoParse($(@)).render()
#         when 'drop-menu' then DropMenuAutoParse($(@)).render()
#     )

module.exports = autoParse
