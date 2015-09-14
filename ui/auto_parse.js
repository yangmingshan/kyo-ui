var DatePickerAutoParse = require('./components/date_picker/auto_parse');
var _ = kyo._;
function AutoParse(el) {
  if(_.isString(el)) {
    this.$el = $(el);
  } else {
    this.$el = el;
  }
}

AutoParse.prototype.$ = function(selector) {
    return this.$el.find(selector);
}

AutoParse.prototype.autoParse = function() {
    var inputs = this.$("[data-type]");
    inputs.each(function(index, ele) {
      var type = $(this).data('type');
      switch (type) {
        case 'date':
          DatePickerAutoParse($(this)).render();
          break;
      }
    });
}

module.exports = AutoParse;
