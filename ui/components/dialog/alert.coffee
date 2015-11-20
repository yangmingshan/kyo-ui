kyo = require 'kyo'
MaskDialog = require './mask_dialog.coffee'
Component = require '../../component.coffee'
_ = kyo._

Alert = MaskDialog.extend({
  classNames: ['kui-dialog', 'kui-alert']
  name: 'alert',
  title: '提示',
  css: {
    width: '360px',
    height: 'auto'
  },
  initialize: ->
    Component.prototype.initialize.call(@)
    @callbacks = []
  cancelText: '',
  alert: (msg, title, callback) ->
    @$el.find('.kui-dialog-content').html(msg)
    if(_.isFunction(title))
      callback = title
      title = undefined
    @$el.find('.kui-dialog-title').html(title) if title
    @callbacks.push(callback) if callback and kyo._.isFunction(callback)
    @show()
  confirm: ->
    MaskDialog.prototype.confirm.call(@)
    if callback = @callbacks.pop()
      callback()
  close: ->
    MaskDialog.prototype.close.call(@)
    if callback = @callbacks.pop()
      callback()
})

module.exports = Alert
