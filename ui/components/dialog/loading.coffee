Dialog = require './dialog.coffee'

Loading = Dialog.extend({
  name: 'loading',
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
    @show()
  cancelLoading: ->
    @close()

})

module.exports = Loading
