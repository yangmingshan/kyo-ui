var DatePickerAutoParse = require('components/date_picker/auto_parse');

function AutoParse(id) {
    this.id = id;
}

AutoParse.prototype.$ = function(selector) {
    return $("#" + this.id).find(selector);
}

AutoParse.prototype.autoParse = function() {
    var inputs = this.$("[data-type]");
    inputs.each(function(index, ele) {
      var type = $(this).data('type');
      switch (type) {
        case 'date':
          DatePicker($(this)).render();
          break;
      }
    });
}

module.exports = AutoParse;
