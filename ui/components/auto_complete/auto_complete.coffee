require('./auto_complete.css')
Component = require('../../component.coffee')

AutoComplete = Component.extend({
  close: ->
    @$target.autocomplete('close')
  renderAfter: ->
    delay = @delay
    model = @model
    @$target.autocomplete({
      html: true,
      autoFocus: true,
      delay: delay || 200,
      source: @source || (request, response) ->
        inputData = request.term
        matcher = new RegExp($.ui.autocomplete.escapeRegex(inputData), 'i')
        filterData = jQuery.grep(model, (data) ->
            matcher.test(data.name)
        )
        responseData = []
        responseData.push({ value: filter.name, label: filter.name }) for filter in filterData

        responseData = ['无数据， 请更换关键字搜索！'] if responseData.length == 0
        response(responseData)
      search: @search
      open: @open
      select: (e, v)=>
        @trigger('select', v.item)
    })
})

module.exports = AutoComplete
