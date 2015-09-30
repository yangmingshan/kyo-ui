DatePicker = require('./date_picker')

AutoParse = (target) ->
  return DatePicker.create({
    $target: target
    })

module.exports =  AutoParse
