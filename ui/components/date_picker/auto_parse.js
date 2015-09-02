var DatePicker = require('./date_picker');

function AutoParse(target) {
  return DatePicker.create({
    $target: target
  });
}

module.exports =  AutoParse;
