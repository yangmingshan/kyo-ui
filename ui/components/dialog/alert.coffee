MaskDialog = require './mask_dialog.coffee'

Alert = MaskDialog.extend({
  classNames: ['kui-dialog', 'kui-alert']
  name: 'alert',
  title: '提示',
  css: {
    width: '360px',
    height: 'auto'
  },
  cancelText: '',
  alert: (msg, title) ->
    @$el.find('.kui-dialog-content').html(msg)
    @$el.find('.kui-dialog-title').html(title) if title
    @show()
})

module.exports = Alert
