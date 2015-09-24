DatePickerAutoParse = require('./components/date_picker/auto_parse.coffee')
_ = kyo._
AutoParse = (el) ->
  if _.isString(el)
    @$el = $(el);
  else
    @$el = el;
  @

AutoParse.prototype.$ = (selector) ->
    return this.$el.find(selector)

AutoParse.prototype.autoParse = ->
    inputs = @$("[data-type]")
    inputs.each( (index, ele) ->
      type = $(@).data('type')
      switch type
        when 'date' then DatePickerAutoParse($(@)).render()
    );

module.exports = AutoParse;
