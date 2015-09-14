MaskDialog = require './mask_dialog.coffee'

Loading = MaskDialog.extend({
  name: 'loading',
  classNames: ['kui-dialog', 'kui-loading']
  title: null,
  css: {
    width: '381px',
    height: 'auto'
  },
  footer: null,
  cancelText: null,
  confirmText: null,
  content: "<div class='kui-dialog-loading'></div>"
  loading:(msg='数据加载中') ->
    @$el.find('.kui-dialog-loading').html(msg)
    MaskDialog.prototype.show.call(@)
  cancelLoading: ->
    MaskDialog.prototype.close.call(@)
})

module.exports = Loading
