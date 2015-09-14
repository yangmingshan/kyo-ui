MaskDialog = require './mask_dialog.coffee'
Component = require '../../component';

Confirm = MaskDialog.extend({
  classNames: ['kui-confirm']
  name: 'confirm'
  title: '确认',
  css: {
    width: '500px',
    height: 'auto'
  },
  initialize: ->
    Component.prototype.initialize.call(@)
    @callbacks = []
  message: (msg, title, callback)->
    @$el.find('.kui-dialog-content').html(msg)
    @$el.find('.kui-dialog-title').html(title) if title
    @callbacks.push(callback) if callback and kyo._.isFunction(callback)
    @show()

  close: ->
    MaskDialog.prototype.close.call(@)
    @callbacks = []
  confirm: ->
    MaskDialog.prototype.confirm.call(@)
    if callback = @callbacks.pop()
      callback()
})

module.exports = Confirm
