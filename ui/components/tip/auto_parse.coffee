require './tip.css'
TipComponent = require './tip'

AutoParse = (target, parent) ->
  tip = TipComponent.create({
    $target: target,
    $el: target,
    tip: target.data('tip')
  })
  tip

module.exports = AutoParse
