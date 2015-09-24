Dialog = require './dialog.coffee'
Component = require '../../component.coffee'

MaskDialog = Dialog.extend({
  show: ->
    kui.loadingMask.show()
    @setPosition()
    Component.prototype.show.call(@)
    @trigger('open')
  close: ->
    Component.prototype.hide.call(@)
    kui.loadingMask.hide()
    @trigger('close')
  confirm: ->
    Component.prototype.hide.call(@)
    kui.loadingMask.hide()
    @trigger('confirm')
})

module.exports = MaskDialog
