kyo = require('kyo')
Component = require('./component.coffee')
DatePicker = require('./components/date_picker/date_picker.coffee')
AutoComplete = require('./components/auto_complete/auto_complete.coffee')
SwitchTab = require('./components/switch_tab/switch_tab.coffee')
Mask = require('./components/mask/mask.coffee')
Dialog = require('./components/dialog/dialog.coffee')
Confirm = require('./components/dialog/confirm.coffee')
Alert = require('./components/dialog/alert.coffee')
Loading = require('./components/dialog/loading.coffee')
Paging = require('./components/paging/paging.coffee')
DropMenu = require('./components/drop_menu/drop_menu.coffee')
Tip = require('./components/tip/tip')

AutoParse = require('./auto_parse.coffee')

##以下控件整个程序应该只有一个

##mask 实例
mask = Mask.create()
mask.render(false)

loadingMask = Mask.create({
  classNames:['kui-mask', 'kui-loading-mask']
})
loadingMask.render(false)

#confirm 实例
_confirm = Confirm.create()
_confirm.render(false)

#alert 实例
_alert = Alert.create()
_alert.render(false)

loading = Loading.create()
loading.render(false)

module.exports = {
  Class: kyo.Class,
  Base: kyo.Base,
  Events: kyo.Events,
  _: kyo._,
  Component: Component,
  SwitchTab: SwitchTab,
  AutoParse: AutoParse,
  mask: mask,
  loadingMask: loadingMask,
  Dialog: Dialog,
  Confirm: Confirm,
  confirm: kyo._.bind(_confirm.message, _confirm),
  alert: kyo._.bind(_alert.alert, _alert),
  loading: kyo._.bind(loading.loading, loading),
  cancelLoading: kyo._.bind(loading.cancelLoading, loading),
  Paging: Paging,
  AutoComplete: AutoComplete
}
