var Component = require('./component');
var DatePicker = require('./components/date_picker/date_picker');
var AutoComplete = require('./components/auto_complete/auto_complete.coffee');
var SwitchTab = require('./components/switch_tab/switch_tab.coffee');
var AutoParse = require('./auto_parse');

module.exports = {
  Component: Component,
  SwitchTab: SwitchTab,
  AutoParse: AutoParse,
  AutoComplete: AutoComplete
};
