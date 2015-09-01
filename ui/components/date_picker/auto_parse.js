var DatePicker = require('./date_picker');

function AutoParse(target) {
  return DatePicker.create({
    target: target
  });
}

return AutoParse;
