Dialog = require './dialog.coffee'
Component = require '../../component.coffee'

Loading = Dialog.extend({
  name: 'loading',
  classNames: ['kui-dialog', 'kui-loading']
  title: null,
  css: {
    width: '361',
    height: 'auto'
  },
  index: 0,
  footer: null,
  hasClose: false,
  cancelText: null,
  confirmText: null,
  content: "<div class='kui-dialog-loading'></div>"
  loading:(msg='数据加载中') ->
    @$el.find('.kui-dialog-loading').html(msg)
    if @index is 0
      kui.loadingMask.show();
      @setPosition()
      Component.prototype.show.call(@)
    @trigger('open')
    @index += 1
  cancelLoading: ->
    @index -= 1 if @index >= 1
    if @index is 0
      Component.prototype.hide.call(@)
      kui.loadingMask.hide()
    @trigger('close')
})

module.exports = Loading
