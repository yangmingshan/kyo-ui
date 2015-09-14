var Component = require('./component');
var DatePicker = require('./components/date_picker/date_picker');
var AutoComplete = require('./components/auto_complete/auto_complete.coffee');
var SwitchTab = require('./components/switch_tab/switch_tab.coffee');
var Mask = require('./components/mask/mask.coffee');
var Dialog = require('./components/dialog/dialog.coffee');
var Confirm = require('./components/dialog/confirm.coffee');
var Alert = require('./components/dialog/alert.coffee');
var Loading = require('./components/dialog/loading.coffee');
var Paging = require('./components/paging/paging.coffee');

var AutoParse = require('./auto_parse');

//以下控件整个程序应该只有一个

// mask 实例
var mask = Mask.create();
mask.render(false);

var loadingMask = Mask.create({
  $el: "<div class='kui-mask kui-loading-mask' style='display:none'></div>"
});
loadingMask.render(false);

//confirm 实例
var _confirm = Confirm.create();
_confirm.render(false);

//alert 实例
var _alert = Alert.create();
_alert.render(false);

var loading = Loading.create();
loading.render(false);

module.exports = {
  Component: Component,
  SwitchTab: SwitchTab,
  AutoParse: AutoParse,
  mask: mask,
  loadingMask: loadingMask,
  Dialog: Dialog,
  confirm: kyo._.bind(_confirm.message, _confirm),
  alert: kyo._.bind(_alert.alert, _alert),
  loading: kyo._.bind(loading.loading, loading),
  cancelLoading: kyo._.bind(loading.cancelLoading, loading),
  Paging: Paging,
  AutoComplete: AutoComplete
};
