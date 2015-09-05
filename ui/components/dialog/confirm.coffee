Dialog = require './dialog.coffee'

Confirm = Dialog.extend({
  name: 'confirm'
  title: '确认',
  css: {
    width: '500px',
    height: 'auto'
  },
  initialize: ->
    Dialog.prototype.initialize.call(@)
    @callbacks = []
  message: (msg, title, callback)->
    @$el.find('.kui-dialog-content').html(msg)
    @$el.find('.kui-dialog-title').html(title) if title
    @callbacks.push(callback) if callback and kyo._.isFunction(callback)
    @show()

  close: ->
    Dialog.prototype.close.call(@)
    @callbacks = []
  confirm: ->
    Dialog.prototype.confirm.call(@)
    if callback = @callbacks.pop()
      callback()
})

module.exports = Confirm
