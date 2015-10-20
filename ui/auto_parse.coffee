_ = kyo._
AutoParse = (el) ->
  if _.isString(el)
    @$el = $(el)
  else
    @$el = el
  @

AutoParse.prototype.$ = (selector) ->
    return this.$el.find(selector)

AutoParse.prototype.autoParse = ->
    DatePickerAutoParse = require('./components/date_picker/auto_parse.coffee')
    DropMenuAutoParse = require('./components/drop_menu/auto_parse.coffee')
    inputs = @$("[data-type]")
    inputs.each( (index, ele) ->
      type = $(@).data('type')
      switch type
        when 'date' then DatePickerAutoParse($(@)).render()
        when 'drop-menu' then DropMenuAutoParse($(@)).render()
    )

module.exports = AutoParse
