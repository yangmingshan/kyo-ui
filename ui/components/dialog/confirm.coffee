kyo = require 'kyo'
MaskDialog = require './mask_dialog.coffee'
Component = require '../../component.coffee'
_ = kyo._

Confirm = MaskDialog.extend({
  classNames: ['kui-dialog', 'kui-confirm']
  name: 'confirm'
  title: '确认',
  css: {
    width: '500px',
    height: 'auto'
  },
  callbacks: [],
  cancelCallbacks: [],
  initialize: ->
    Component.prototype.initialize.call(@)
    @callbacks = []
  message: (msg, title, callback)->
    if arguments.length is 1
      options = arguments[0]
      msg = options.msg
      title = options.title
      callback = options.confirm
      cancel = options.cancel
      confirmText = options.confirmText
      cancelText = options.cancelText
    @$el.find('.kui-dialog-content').html(msg)
    @$('.kui-dialog-confirm').html(confirmText || @confirmText)
    @$('.kui-dialog-cancel').html(cancelText || @cancelText)
    if(_.isFunction(title))
      callback = title
      title = undefined
    @$el.find('.kui-dialog-title').html(title) if title
    @cancelCallbacks.push(cancel) if cancel and kyo._.isFunction(cancel)
    @callbacks.push(callback) if callback and kyo._.isFunction(callback)
    @show()

  confirm: ->
    MaskDialog.prototype.confirm.call(@)
    if callback = @callbacks.pop()
      callback()
    @callbacks = []
    @cancelCallbacks = []
  close: ->
    MaskDialog.prototype.close.call(@)
    if cancel = @cancelCallbacks.pop()
      cancel()
    @callbacks = []
    @cancelCallbacks = []
})

module.exports = Confirm
