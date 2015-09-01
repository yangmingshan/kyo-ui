var DatePicker = require('./date_picker');

function AutoParse(target) {
  return DatePicker.create({
    $el: target
  });
}

module.exports =  AutoParse;
