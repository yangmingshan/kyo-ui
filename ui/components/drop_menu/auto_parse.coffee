DropMenu = require './drop_menu'

AutoParse = (target) ->
  return DropMenu.create({
    $target: target
  })

module.exports = AutoParse
