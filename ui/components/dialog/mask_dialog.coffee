Dialog = require './dialog.coffee'
Component = require '../../component.coffee'

MaskDialog = Dialog.extend({
  show: ->
    @setPosition()
    Component.prototype.show.call(@)
    @trigger('open')
    # 避免mask重复计数
    kui.loadingMask.show() unless @alreadyShow
    @alreadyShow = true
  close: ->
    Component.prototype.hide.call(@)
    kui.loadingMask.hide()
    @trigger('close')
    @alreadyShow = false
  confirm: ->
    Component.prototype.hide.call(@)
    kui.loadingMask.hide()
    @trigger('confirm')
    @alreadyShow = false
})

module.exports = MaskDialog
